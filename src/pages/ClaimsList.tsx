import React, { useState } from 'react';
import { Search, AlertCircle } from 'lucide-react';
import { format } from 'date-fns';
import { useUser } from '@clerk/clerk-react';
import axios from 'axios';
import { Product } from '../types';

export const ClaimsList: React.FC = () => {
  const { user } = useUser();
  const [searchImei, setSearchImei] = useState('');
  const [loading, setLoading] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [error, setError] = useState('');

  const handleSearch = async () => {
    if (!searchImei.trim()) {
      setError('Please enter an IMEI number');
      return;
    }
    
    setLoading(true);
    setError('');
    
    try {
      const response = await axios.get(`/api/products/${searchImei}`, {
        params: { storeId: user?.id }
      });
      setSelectedProduct(response.data);
    } catch (error) {
      console.error('Error searching product:', error);
      setError('Product not found or you do not have access to view it');
      setSelectedProduct(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <div className="flex gap-4">
          <input
            type="text"
            placeholder="Enter IMEI number"
            value={searchImei}
            onChange={(e) => setSearchImei(e.target.value)}
            className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
          <button
            onClick={handleSearch}
            disabled={loading}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            {loading ? 'Searching...' : (
              <>
                <Search className="h-4 w-4 mr-2" />
                Search
              </>
            )}
          </button>
        </div>
        
        {error && (
          <div className="mt-4 p-4 bg-red-50 rounded-md flex items-start">
            <AlertCircle className="h-5 w-5 text-red-400 mt-0.5 mr-2" />
            <p className="text-sm text-red-700">{error}</p>
          </div>
        )}
      </div>

      {selectedProduct && (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">Product Details</h3>
          </div>
          
          <div className="px-6 py-4">
            <dl className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-4">
              <div>
                <dt className="text-sm font-medium text-gray-500">IMEI Number</dt>
                <dd className="mt-1 text-sm text-gray-900">{selectedProduct.imei}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">Model</dt>
                <dd className="mt-1 text-sm text-gray-900">{selectedProduct.model}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">Brand</dt>
                <dd className="mt-1 text-sm text-gray-900">{selectedProduct.brand}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">Purchase Date</dt>
                <dd className="mt-1 text-sm text-gray-900">
                  {format(new Date(selectedProduct.purchaseDate), 'PPP')}
                </dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">Insurance Type</dt>
                <dd className="mt-1 text-sm text-gray-900">
                  {selectedProduct.insuranceType.charAt(0).toUpperCase() + 
                   selectedProduct.insuranceType.slice(1)}
                </dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">Price</dt>
                <dd className="mt-1 text-sm text-gray-900">
                  ${selectedProduct.price.toFixed(2)}
                </dd>
              </div>
            </dl>

            <div className="mt-6">
              <h4 className="text-sm font-medium text-gray-500">Customer Information</h4>
              <dl className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-4">
                <div>
                  <dt className="text-sm font-medium text-gray-500">Name</dt>
                  <dd className="mt-1 text-sm text-gray-900">{selectedProduct.customerName}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Phone</dt>
                  <dd className="mt-1 text-sm text-gray-900">{selectedProduct.customerPhone}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Email</dt>
                  <dd className="mt-1 text-sm text-gray-900">{selectedProduct.customerEmail}</dd>
                </div>
              </dl>
            </div>

            {selectedProduct.productImages && selectedProduct.productImages.length > 0 && (
              <div className="mt-6">
                <h4 className="text-sm font-medium text-gray-500 mb-2">Product Images</h4>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {selectedProduct.productImages.map((image, index) => (
                    <img
                      key={index}
                      src={image}
                      alt={`Product ${index + 1}`}
                      className="h-32 w-full object-cover rounded-lg"
                    />
                  ))}
                </div>
              </div>
            )}

            {selectedProduct.additionalDetails && (
              <div className="mt-6">
                <h4 className="text-sm font-medium text-gray-500">Additional Details</h4>
                <p className="mt-2 text-sm text-gray-900">{selectedProduct.additionalDetails}</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};