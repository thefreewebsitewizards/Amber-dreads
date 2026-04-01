import { ChangeEvent, DragEvent, FormEvent, useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router';
import { getIdTokenResult, onAuthStateChanged, signInWithEmailAndPassword, signOut, User } from 'firebase/auth';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';
import { ImagePlus, Lock, LogOut, Pencil, Plus, Save, Trash2, UploadCloud } from 'lucide-react';
import { auth, callFunction, db, STORE_ID } from '../../firebaseConfig';

type Product = {
  id: string;
  name?: string;
  category?: string;
  price?: string;
  description?: string;
  img?: string;
  tag?: string;
  length?: string;
  quantity?: string;
  updatedAt?: string;
};

type ProductMutationResponse = {
  success: boolean;
  message: string;
  productId?: string;
};

type BootstrapAdminClaimsResponse = {
  success: boolean;
  bootstrapped: boolean;
};

type ConfirmModalState =
  | { type: 'delete'; productId: string; productName: string }
  | { type: 'signout' };

const emptyForm = {
  name: '',
  category: '',
  price: '',
  description: '',
  img: '',
  tag: '',
  length: '',
  quantity: '',
};

export function AdminPage() {
  const [user, setUser] = useState<User | null>(null);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [claimStoreId, setClaimStoreId] = useState('');
  const [claimRole, setClaimRole] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [products, setProducts] = useState<Product[]>([]);
  const [loadingProducts, setLoadingProducts] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [editingProductId, setEditingProductId] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [activatingAdmin, setActivatingAdmin] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [confirmModal, setConfirmModal] = useState<ConfirmModalState | null>(null);

  useEffect(() => {
    if (!message && !error) {
      return;
    }
    const timer = window.setTimeout(() => {
      setMessage('');
      setError('');
    }, 3200);
    return () => window.clearTimeout(timer);
  }, [message, error]);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (nextUser) => {
      setUser(nextUser);
      setError('');
      if (!nextUser) {
        setClaimRole('');
        setClaimStoreId('');
        setCheckingAuth(false);
        return;
      }
      try {
        const token = await getIdTokenResult(nextUser, true);
        setClaimRole(String(token.claims.role || ''));
        setClaimStoreId(String(token.claims.storeId || ''));
      } catch {
        setClaimRole('');
        setClaimStoreId('');
      } finally {
        setCheckingAuth(false);
      }
    });
    return () => unsub();
  }, []);

  const hasStoreId = Boolean(STORE_ID);
  const isAdminForStore = Boolean(user && claimRole === 'admin' && claimStoreId === STORE_ID);

  useEffect(() => {
    if (!isAdminForStore || !hasStoreId) {
      setProducts([]);
      return;
    }
    setLoadingProducts(true);
    const productsQuery = query(collection(db, 'stores', STORE_ID, 'products'), orderBy('updatedAt', 'desc'));
    const unsub = onSnapshot(
      productsQuery,
      (snap) => {
        const nextProducts = snap.docs.map((doc) => ({ id: doc.id, ...(doc.data() as Omit<Product, 'id'>) }));
        setProducts(nextProducts);
        setLoadingProducts(false);
      },
      () => {
        setLoadingProducts(false);
        setError('Failed to load products. Please refresh.');
      },
    );
    return () => unsub();
  }, [hasStoreId, isAdminForStore]);

  const categories = useMemo(
    () => ['Woolies', 'Crochet Dreads', 'Twist & Seal Dreads', 'Curls/Waves', 'Dread Falls', 'Dread Clips', 'Clip-Ins', 'Carabiner Braids', 'Dread Loom', 'Earrings', 'Smoking Accessories', 'Other'],
    [],
  );
  const storage = useMemo(() => getStorage(), []);

  function resetEditor() {
    setForm(emptyForm);
    setEditingProductId('');
  }

  function getPayloadFromForm() {
    return Object.fromEntries(
      Object.entries(form)
        .map(([k, v]) => [k, v.trim()])
        .filter(([, v]) => v !== ''),
    );
  }

  async function handleImageFile(file: File) {
    if (!file.type.startsWith('image/')) {
      setError('Please upload an image file.');
      return;
    }
    setError('');
    setMessage('');
    setUploadingImage(true);
    try {
      const safeName = file.name.replace(/\s+/g, '-').toLowerCase();
      const filePath = `stores/${STORE_ID}/products/${Date.now()}-${safeName}`;
      const storageRef = ref(storage, filePath);
      await uploadBytes(storageRef, file);
      const imageUrl = await getDownloadURL(storageRef);
      setForm((prev) => ({ ...prev, img: imageUrl }));
      setMessage('Image uploaded successfully.');
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Image upload failed.';
      setError(msg);
    } finally {
      setUploadingImage(false);
    }
  }

  function handleImageInputChange(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      void handleImageFile(file);
    }
  }

  function handleDrop(e: DragEvent<HTMLLabelElement>) {
    e.preventDefault();
    setDragActive(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      void handleImageFile(file);
    }
  }

  async function handleActivateAdminAccess(currentUser: User) {
    setMessage('');
    setError('');
    setActivatingAdmin(true);
    try {
      await callFunction<BootstrapAdminClaimsResponse>('bootstrapAdminClaims', STORE_ID);
      await currentUser.getIdToken(true);
      const token = await getIdTokenResult(currentUser, true);
      setClaimRole(String(token.claims.role || ''));
      setClaimStoreId(String(token.claims.storeId || ''));
      setMessage(`Admin access is active for ${STORE_ID}.`);
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Unable to activate admin access.';
      setError(msg);
    } finally {
      setActivatingAdmin(false);
    }
  }

  async function handleLogin(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setMessage('');
    setError('');
    setSubmitting(true);
    try {
      const credential = await signInWithEmailAndPassword(auth, email.trim(), password);
      if (STORE_ID) {
        await handleActivateAdminAccess(credential.user);
      }
      setPassword('');
      if (!STORE_ID) {
        setMessage('Signed in successfully.');
      }
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Unable to sign in.';
      setError(msg);
    } finally {
      setSubmitting(false);
    }
  }

  async function handleSaveProduct(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setMessage('');
    setError('');
    if (!isAdminForStore) {
      setError('You must be a store admin to manage products.');
      return;
    }
    if (!form.name.trim()) {
      setError('Product name is required.');
      return;
    }
    if (uploadingImage) {
      setError('Please wait for image upload to complete.');
      return;
    }
    setSubmitting(true);
    try {
      const payload = getPayloadFromForm();
      if (editingProductId) {
        await callFunction<ProductMutationResponse>('updateProduct', STORE_ID, {
          productId: editingProductId,
          updates: payload,
        });
        setMessage('Product updated.');
      } else {
        await callFunction<ProductMutationResponse>('addProduct', STORE_ID, {
          productData: payload,
        });
        setMessage('Product added.');
      }
      resetEditor();
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Unable to save product.';
      setError(msg);
    } finally {
      setSubmitting(false);
    }
  }

  function handleEdit(product: Product) {
    setMessage('');
    setError('');
    setEditingProductId(product.id);
    setForm({
      name: product.name || '',
      category: product.category || '',
      price: product.price || '',
      description: product.description || '',
      img: product.img || '',
      tag: product.tag || '',
      length: product.length || '',
      quantity: product.quantity || '',
    });
  }

  async function handleDelete(productId: string) {
    if (!isAdminForStore) {
      return;
    }
    setMessage('');
    setError('');
    setSubmitting(true);
    try {
      await callFunction<ProductMutationResponse>('deleteProduct', STORE_ID, { productId });
      if (editingProductId === productId) {
        resetEditor();
      }
      setMessage('Product deleted.');
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Unable to delete product.';
      setError(msg);
    } finally {
      setSubmitting(false);
    }
  }

  async function handleSignOut() {
    await signOut(auth);
    setMessage('Signed out.');
    resetEditor();
  }

  function openDeleteModal(product: Product) {
    if (!isAdminForStore) {
      return;
    }
    setConfirmModal({
      type: 'delete',
      productId: product.id,
      productName: product.name || 'this product',
    });
  }

  function openSignOutModal() {
    setConfirmModal({ type: 'signout' });
  }

  async function handleConfirmModalAction() {
    if (!confirmModal) {
      return;
    }
    const action = confirmModal;
    setConfirmModal(null);
    if (action.type === 'delete') {
      await handleDelete(action.productId);
      return;
    }
    await handleSignOut();
  }

  return (
    <div style={{ background: '#FAF7F2', minHeight: '100vh', paddingTop: '80px' }}>
      <div className="py-14 px-4 text-center" style={{ background: '#F5EFE6', borderBottom: '1px solid #E8D5C4' }}>
        <p className="mb-2 tracking-widest uppercase text-xs" style={{ color: '#C4785A', fontFamily: "'Nunito', sans-serif", fontWeight: 700 }}>
          Store Admin
        </p>
        <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(2rem, 5vw, 3rem)', color: '#2C1E18', fontWeight: 700 }}>
          Product Manager
        </h1>
        <p className="max-w-xl mx-auto mt-3 text-sm leading-relaxed" style={{ color: '#7C5C48', fontFamily: "'Nunito', sans-serif" }}>
          Add, update, and remove products for this store from one clean dashboard.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 xl:grid-cols-5 gap-8">
        <div className="xl:col-span-2 rounded-3xl p-6 xl:sticky xl:top-24 xl:self-start xl:max-h-[calc(100vh-90px)] xl:overflow-y-auto" style={{ background: '#F5EFE6', border: '1px solid #E8D5C4' }}>
          <div className="flex items-center justify-between mb-4">
            <h2 style={{ fontFamily: "'Playfair Display', serif", color: '#2C1E18', fontWeight: 600, fontSize: '1.4rem' }}>
              {editingProductId ? 'Edit Product' : 'Add Product'}
            </h2>
            <span className="px-3 py-1 rounded-full text-xs" style={{ background: '#FAF7F2', color: '#7C5C48', border: '1px solid #E8D5C4', fontFamily: "'Nunito', sans-serif", fontWeight: 700 }}>
              {STORE_ID || 'Store ID missing'}
            </span>
          </div>

          {!hasStoreId && (
            <p className="mb-4 text-sm" style={{ color: '#9A4330', fontFamily: "'Nunito', sans-serif" }}>
              Missing VITE_STORE_ID in environment configuration.
            </p>
          )}

          {checkingAuth ? (
            <p style={{ color: '#7C5C48', fontFamily: "'Nunito', sans-serif" }}>Checking admin session...</p>
          ) : !user ? (
            <form onSubmit={handleLogin} className="flex flex-col gap-3">
              <label className="text-xs tracking-wider uppercase" style={{ color: '#7C5C48', fontFamily: "'Nunito', sans-serif", fontWeight: 700 }}>Admin Email</label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                required
                className="w-full rounded-xl px-4 py-3 text-sm"
                style={{ background: '#FAF7F2', border: '1px solid #E8D5C4', fontFamily: "'Nunito', sans-serif", color: '#2C1E18' }}
              />
              <label className="text-xs tracking-wider uppercase mt-2" style={{ color: '#7C5C48', fontFamily: "'Nunito', sans-serif", fontWeight: 700 }}>Password</label>
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                required
                className="w-full rounded-xl px-4 py-3 text-sm"
                style={{ background: '#FAF7F2', border: '1px solid #E8D5C4', fontFamily: "'Nunito', sans-serif", color: '#2C1E18' }}
              />
              <button
                disabled={submitting || activatingAdmin}
                type="submit"
                className="mt-3 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full text-sm transition-all duration-200 hover:scale-[1.01]"
                style={{ background: '#2C1E18', color: '#FAF7F2', fontFamily: "'Nunito', sans-serif", fontWeight: 700, border: 'none', cursor: 'pointer' }}
              >
                <Lock size={16} />
                {submitting || activatingAdmin ? 'Signing in...' : 'Admin Sign In'}
              </button>
            </form>
          ) : !isAdminForStore ? (
            <div>
              <p className="text-sm mb-4 leading-relaxed" style={{ color: '#9A4330', fontFamily: "'Nunito', sans-serif" }}>
                This account is signed in but is not authorized as admin for {STORE_ID}.
              </p>
              <button
                onClick={() => user && handleActivateAdminAccess(user)}
                disabled={activatingAdmin}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-full text-sm mr-3"
                style={{ background: '#C4785A', color: '#FAF7F2', fontFamily: "'Nunito', sans-serif", fontWeight: 700, border: 'none', cursor: 'pointer' }}
              >
                <Lock size={16} />
                {activatingAdmin ? 'Activating...' : 'Activate Admin Access'}
              </button>
              <button
                onClick={openSignOutModal}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-full text-sm"
                style={{ background: '#2C1E18', color: '#FAF7F2', fontFamily: "'Nunito', sans-serif", fontWeight: 700, border: 'none', cursor: 'pointer' }}
              >
                <LogOut size={16} />
                Sign Out
              </button>
            </div>
          ) : (
            <form onSubmit={handleSaveProduct} className="grid grid-cols-1 gap-3">
              <p className="text-xs" style={{ color: '#7C5C48', fontFamily: "'Nunito', sans-serif" }}>
                Signed in as {user.email}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                  value={form.name}
                  onChange={(e) => setForm((prev) => ({ ...prev, name: e.target.value }))}
                  placeholder="Product name"
                  className="rounded-xl px-4 py-3 text-sm"
                  style={{ background: '#FAF7F2', border: '1px solid #E8D5C4', fontFamily: "'Nunito', sans-serif", color: '#2C1E18' }}
                  required
                />
                <select
                  value={form.category}
                  onChange={(e) => setForm((prev) => ({ ...prev, category: e.target.value }))}
                  className="rounded-xl px-4 py-3 text-sm"
                  style={{ background: '#FAF7F2', border: '1px solid #E8D5C4', fontFamily: "'Nunito', sans-serif", color: '#2C1E18' }}
                >
                  <option value="">Category</option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                  value={form.price}
                  onChange={(e) => setForm((prev) => ({ ...prev, price: e.target.value }))}
                  placeholder="$25 + shipping"
                  className="rounded-xl px-4 py-3 text-sm"
                  style={{ background: '#FAF7F2', border: '1px solid #E8D5C4', fontFamily: "'Nunito', sans-serif", color: '#2C1E18' }}
                />
                <input
                  value={form.quantity}
                  onChange={(e) => setForm((prev) => ({ ...prev, quantity: e.target.value }))}
                  placeholder="Quantity"
                  className="rounded-xl px-4 py-3 text-sm"
                  style={{ background: '#FAF7F2', border: '1px solid #E8D5C4', fontFamily: "'Nunito', sans-serif", color: '#2C1E18' }}
                />
              </div>
              <label
                onDragOver={(e) => {
                  e.preventDefault();
                  setDragActive(true);
                }}
                onDragLeave={() => setDragActive(false)}
                onDrop={handleDrop}
                className="rounded-2xl p-4 text-sm block cursor-pointer transition-all duration-200"
                style={{
                  background: dragActive ? '#F0E7DC' : '#FAF7F2',
                  border: `1px dashed ${dragActive ? '#C4785A' : '#D9C3B0'}`,
                  fontFamily: "'Nunito', sans-serif",
                  color: '#2C1E18',
                }}
              >
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageInputChange}
                  disabled={uploadingImage}
                />
                <div className="flex items-center gap-3">
                  {uploadingImage ? <UploadCloud size={18} /> : <ImagePlus size={18} />}
                  <span>{uploadingImage ? 'Uploading image...' : 'Browse image or drag and drop here'}</span>
                </div>
              </label>
              {form.img && (
                <div className="rounded-2xl p-3 flex items-center justify-between" style={{ background: '#FAF7F2', border: '1px solid #E8D5C4' }}>
                  <div className="flex items-center gap-3">
                    <img src={form.img} alt="Uploaded product" className="h-12 w-12 rounded-lg object-cover" />
                    <p className="text-xs" style={{ color: '#7C5C48', fontFamily: "'Nunito', sans-serif" }}>
                      Product image ready
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setForm((prev) => ({ ...prev, img: '' }))}
                    className="px-3 py-2 rounded-full text-xs"
                    style={{ background: '#FDF1ED', border: '1px solid #F2C9BA', color: '#9A4330', fontFamily: "'Nunito', sans-serif", fontWeight: 700, cursor: 'pointer' }}
                  >
                    Remove
                  </button>
                </div>
              )}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                  value={form.tag}
                  onChange={(e) => setForm((prev) => ({ ...prev, tag: e.target.value }))}
                  placeholder="Tag (optional)"
                  className="rounded-xl px-4 py-3 text-sm"
                  style={{ background: '#FAF7F2', border: '1px solid #E8D5C4', fontFamily: "'Nunito', sans-serif", color: '#2C1E18' }}
                />
                <input
                  value={form.length}
                  onChange={(e) => setForm((prev) => ({ ...prev, length: e.target.value }))}
                  placeholder="Length (optional)"
                  className="rounded-xl px-4 py-3 text-sm"
                  style={{ background: '#FAF7F2', border: '1px solid #E8D5C4', fontFamily: "'Nunito', sans-serif", color: '#2C1E18' }}
                />
              </div>
              <textarea
                value={form.description}
                onChange={(e) => setForm((prev) => ({ ...prev, description: e.target.value }))}
                placeholder="Description"
                className="rounded-2xl px-4 py-3 text-sm min-h-28"
                style={{ background: '#FAF7F2', border: '1px solid #E8D5C4', fontFamily: "'Nunito', sans-serif", color: '#2C1E18' }}
              />
              <div className="flex flex-wrap gap-3 pt-2">
                <button
                  disabled={submitting || uploadingImage}
                  type="submit"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-full text-sm"
                  style={{ background: '#C4785A', color: '#FAF7F2', fontFamily: "'Nunito', sans-serif", fontWeight: 700, border: 'none', cursor: 'pointer' }}
                >
                  {editingProductId ? <Save size={16} /> : <Plus size={16} />}
                  {submitting ? 'Saving...' : editingProductId ? 'Save Changes' : 'Add Product'}
                </button>
                {editingProductId && (
                  <button
                    type="button"
                    onClick={resetEditor}
                    className="px-5 py-3 rounded-full text-sm"
                    style={{ background: 'transparent', color: '#7C5C48', border: '1px solid #E8D5C4', fontFamily: "'Nunito', sans-serif", fontWeight: 700, cursor: 'pointer' }}
                  >
                    Cancel Edit
                  </button>
                )}
                <button
                  type="button"
                  onClick={openSignOutModal}
                  className="px-5 py-3 rounded-full text-sm"
                  style={{ background: '#2C1E18', color: '#FAF7F2', border: 'none', fontFamily: "'Nunito', sans-serif", fontWeight: 700, cursor: 'pointer' }}
                >
                  Sign Out
                </button>
              </div>
            </form>
          )}

        </div>

        <div className="xl:col-span-3 rounded-3xl p-6 flex flex-col xl:max-h-[calc(100vh-90px)]" style={{ background: '#F5EFE6', border: '1px solid #E8D5C4' }}>
          <div className="flex items-center justify-between mb-5">
            <h2 style={{ fontFamily: "'Playfair Display', serif", color: '#2C1E18', fontWeight: 600, fontSize: '1.4rem' }}>
              Live Products
            </h2>
            <Link
              to="/shop"
              className="px-4 py-2 rounded-full text-xs"
              style={{ background: '#FAF7F2', border: '1px solid #E8D5C4', color: '#7C5C48', textDecoration: 'none', fontFamily: "'Nunito', sans-serif", fontWeight: 700 }}
            >
              Open Shop
            </Link>
          </div>
          <div className="xl:flex-1 xl:overflow-y-auto xl:pr-1">
            {checkingAuth ? (
              <p style={{ color: '#7C5C48', fontFamily: "'Nunito', sans-serif" }}>Checking admin session...</p>
            ) : !isAdminForStore ? (
              <p style={{ color: '#9A4330', fontFamily: "'Nunito', sans-serif" }}>
                You are not authorized to view the content of this page.
              </p>
            ) : loadingProducts ? (
              <p style={{ color: '#7C5C48', fontFamily: "'Nunito', sans-serif" }}>Loading products...</p>
            ) : products.length === 0 ? (
              <p style={{ color: '#7C5C48', fontFamily: "'Nunito', sans-serif" }}>No products yet for this store.</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {products.map((product) => (
                  <div key={product.id} className="p-4 rounded-2xl flex flex-col min-h-72" style={{ background: '#FAF7F2', border: '1px solid #E8D5C4' }}>
                    <p className="text-xs mb-1 tracking-wider uppercase" style={{ color: '#C4785A', fontFamily: "'Nunito', sans-serif", fontWeight: 700 }}>
                      {product.category || 'Uncategorized'}
                    </p>
                    <h3 className="mb-2" style={{ fontFamily: "'Playfair Display', serif", color: '#2C1E18', fontSize: '1.1rem', fontWeight: 600 }}>
                      {product.name || 'Untitled Product'}
                    </h3>
                    <p className="text-xs mb-3 leading-relaxed flex-1" style={{ color: '#7C5C48', fontFamily: "'Nunito', sans-serif" }}>
                      {product.description || 'No description added yet.'}
                    </p>
                    <div className="flex items-center justify-between mt-auto pt-2">
                      <span style={{ color: '#2C1E18', fontFamily: "'Playfair Display', serif", fontWeight: 700 }}>
                        {product.price || 'No price'}
                      </span>
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => handleEdit(product)}
                          className="h-9 w-9 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-105"
                          style={{ background: '#F5EFE6', border: '1px solid #D8C0AC', color: '#7C5C48', cursor: 'pointer' }}
                          aria-label={`Edit ${product.name || 'product'}`}
                        >
                          <Pencil size={15} />
                        </button>
                        <button
                          type="button"
                          onClick={() => openDeleteModal(product)}
                          className="h-9 w-9 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-105"
                          style={{ background: '#FDF1ED', border: '1px solid #EDB8A7', color: '#9A4330', cursor: 'pointer' }}
                          aria-label={`Delete ${product.name || 'product'}`}
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      {confirmModal && (
        <div className="fixed inset-0 z-[90] flex items-center justify-center px-4" style={{ background: 'rgba(44,30,24,0.45)' }}>
          <div className="w-full max-w-md rounded-3xl p-6" style={{ background: '#FAF7F2', border: '1px solid #E8D5C4', boxShadow: '0 18px 48px rgba(44,30,24,0.25)' }}>
            <p className="mb-1 tracking-widest uppercase text-xs" style={{ color: '#C4785A', fontFamily: "'Nunito', sans-serif", fontWeight: 700 }}>
              Confirmation
            </p>
            <h3 className="mb-3" style={{ fontFamily: "'Playfair Display', serif", color: '#2C1E18', fontSize: '1.5rem', fontWeight: 700 }}>
              {confirmModal.type === 'delete' ? 'Delete Product?' : 'Sign Out?'}
            </h3>
            <p className="text-sm leading-relaxed" style={{ color: '#7C5C48', fontFamily: "'Nunito', sans-serif" }}>
              {confirmModal.type === 'delete'
                ? `This will permanently delete ${confirmModal.productName}.`
                : 'You will be signed out of the admin dashboard.'}
            </p>
            <div className="mt-6 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setConfirmModal(null)}
                className="px-5 py-3 rounded-full text-sm"
                style={{ background: 'transparent', border: '1px solid #E8D5C4', color: '#7C5C48', fontFamily: "'Nunito', sans-serif", fontWeight: 700, cursor: 'pointer' }}
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmModalAction}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-full text-sm"
                style={{
                  background: confirmModal.type === 'delete' ? '#9A4330' : '#2C1E18',
                  border: 'none',
                  color: '#FAF7F2',
                  fontFamily: "'Nunito', sans-serif",
                  fontWeight: 700,
                  cursor: 'pointer',
                }}
              >
                {confirmModal.type === 'delete' ? <Trash2 size={15} /> : <LogOut size={15} />}
                {confirmModal.type === 'delete' ? 'Delete Now' : 'Sign Out'}
              </button>
            </div>
          </div>
        </div>
      )}
      {(message || error) && (
        <div className="fixed right-4 top-24 z-[80] w-[min(92vw,420px)]">
          <div
            className="rounded-2xl p-4 flex items-start justify-between gap-4"
            style={{
              background: error ? '#FDF1ED' : '#EEF8F1',
              border: `1px solid ${error ? '#EDB8A7' : '#B8DEC4'}`,
              boxShadow: '0 14px 34px rgba(44,30,24,0.16)',
            }}
          >
            <p style={{ color: error ? '#9A4330' : '#2A7E4C', fontFamily: "'Nunito', sans-serif", fontWeight: 700 }}>
              {error || message}
            </p>
            <button
              type="button"
              onClick={() => {
                setMessage('');
                setError('');
              }}
              className="px-3 py-1 rounded-full text-xs"
              style={{
                background: 'transparent',
                border: `1px solid ${error ? '#EDB8A7' : '#B8DEC4'}`,
                color: error ? '#9A4330' : '#2A7E4C',
                fontFamily: "'Nunito', sans-serif",
                fontWeight: 700,
                cursor: 'pointer',
              }}
            >
              Dismiss
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
