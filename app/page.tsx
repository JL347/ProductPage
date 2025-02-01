"use client";

import { useState, useEffect } from 'react'
import Image from 'next/image'
import stacklineLogo from '../public/stackline_logo.svg'
import dayjs from 'dayjs'
import Chart from './components/Chart'

interface Product {
  id: string;
  image: string;
  title: string;
  name: string;
  email: string;
  role: string;
  brand: string;
  details: string[];
  retailer: string;
  subtitle: string;
  tags: string[];
  reviews: {
      customer: string;
      review: string;
      score: number;
  }[];
  sales: {
    weekEnding: string;
    retailSales: number;
    wholesaleSales: number;
    unitsSold: number;
    retailerMargin: number;
  }[];
}

export default function Home() {
  const [products, setProducts] = useState<Product[]>([])

  useEffect(() => {
    fetch('/data.json')
    .then((res) => res.json())
    .then((data) => setProducts(data))
  }, [])

  const product = products[0] || {
    id: '',
    image: '',
    title: '',
    name: '',
    email: '',
    role: '',
    brand: '',
    details: [],
    retailer: '',
    subtitle: '',
    tags: [],
    reviews: [],
    sales: [],
  }

  const formatCurrency = (value: number) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value)

  return (
    <>
      <div>
        <div className="hidden sm:fixed sm:inset-y-0 sm:z-50 sm:flex sm:w-72 sm:flex-col">
          <div className="flex grow flex-col gap-y-4 overflow-y-auto border-r border-gray-200 bg-white px-6">
            <div className="flex h-12 shrink-0 justify-center my-2">
              <Image src={stacklineLogo} alt="Stackline Logo" height={50} width={150} className="bg-sky-800 p-2 rounded-md" />
            </div>
            <div className="flex justify-center">
              {product.image && (
                <Image loader={() => product.image} src={product.image} alt={product.title} height={150} width={150} />
              )}
            </div>
            <h1 className="text-center text-xl font-semibold text-gray-900">
              {product.title}
            </h1>
            <p className="text-center text-sm text-gray-500 border-b border-gray-200 pb-2">
              {product.subtitle}
            </p>
            {product.tags.length > 0 && (
              <div className="flex justify-center gap-2">
                {product.tags.map((tag) => (
                  <span key={tag} className="inline-flex items-center rounded-md bg-gray-50 px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10">
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        <main className="py-10 sm:pl-72">
          <div className="px-4 sm:px-8">
            <div>
              <Chart sales={product.sales} />
            </div>
            <div className="px-4 sm:px-6 lg:px-8">
              <div className="mt-8 flow-root">
                <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                  <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                    <div className="overflow-hidden shadow ring-1 ring-black/5 sm:rounded-lg">
                      <table className="min-w-full divide-y divide-gray-300">
                        <thead className="bg-gray-50">
                          <tr>
                            <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                              Week Ending
                            </th>
                            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                              Retail Sales
                            </th>
                            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                              Wholesale Sales
                            </th>
                            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                              Units Sold
                            </th>
                            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                              Retailer Margin
                            </th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 bg-white">
                          {product.sales.map((sale) => (
                            <tr key={sale.weekEnding}>
                              <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                                {dayjs(sale.weekEnding).format('MM-DD-YYYY')}
                              </td>
                              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{formatCurrency(sale.retailSales)}</td>
                              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{formatCurrency(sale.wholesaleSales)}</td>
                              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{sale.unitsSold}</td>
                              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{formatCurrency(sale.retailerMargin)}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  )
}
