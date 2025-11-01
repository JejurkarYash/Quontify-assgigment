"use client";

import axios from 'axios';
import React, { useState, useEffect } from 'react'

interface Stock {
    id?: number | undefined
    name: string
    createdAt: Date
}

const WatchList = () => {
    const [stocks, setStocks] = useState<Stock[]>([])
    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const [stockName, setStockName] = useState('')
    const [error, setError] = useState<string | null>(null);
    const [feildErrors, setFeildErrors] = useState(" ");


    useEffect(() => {
        const fetchStocks = async () => {
            const stocks = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/stock`)
            console.log(stocks.data.data);
            setStocks(stocks.data.data)
        }
        fetchStocks()
    }, [])

    const handleAddStock = async (e: React.FormEvent) => {
        e.preventDefault()


        try {

            if (stockName.trim()) {
                const newStock = {
                    name: stockName.trim(),
                    createdAt: new Date()
                }

                const stock = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/stock`, {
                    name: stockName.trim(),
                })
                setIsDialogOpen(false)
                setStocks([...stocks, stock.data.data])
                setStockName('')


            }


        } catch (err: any) {

            if (err.response?.status === 400) {
                const errorData = err.response.data
                console.log(errorData.fieldErrors.name)

                // Set field-specific errors
                if (errorData.fieldErrors) {
                    setFeildErrors(errorData.fieldErrors.name);
                }

                // Set general error message
                if (errorData.message) {
                    setError(errorData.message)
                }
            } else {
                // Handle other errors
                setError('Failed to add stock. Please try again.')
            }
            console.error('Failed to add stock:', err)


        }
    }

    const handleRemoveStock = async (id: number | undefined) => {
        if (id === undefined) return;

        const stock = await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/stock/${id}`);
        console.log(stock.data);
        if (stock.status === 200) {
            setStocks(stocks.filter(stock => stock.id !== id))
        }
    }

    return (
        <div className="min-h-screen w-screen bg-black text-zinc-100 px-4  sm:p-6 lg:p-8 flex items-center sm:justify-cente0r lg:justify-start  ">
            <div className="w-full max-w-6xl  px-6 ">
                {/* Header */}
                <div className="flex flex-col items-center sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 sm:mb-8">
                    <div className="text-center sm:text-left w-full sm:w-auto">
                        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-1 sm:mb-2">My Watchlist</h1>
                        <p className="text-sm sm:text-base text-zinc-400">Track your favorite stocks</p>
                    </div>
                    <button
                        onClick={() => setIsDialogOpen(true)}
                        className="flex items-center justify-center gap-2 px-4 py-2.5 sm:py-2 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 rounded-lg transition-colors shadow-lg hover:shadow-zinc-900/50 w-full sm:w-auto"
                    >
                        <svg
                            className="w-5 h-5"
                            fill="none"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path d="M12 4v16m8-8H4" />
                        </svg>
                        <span className="font-medium">Add Stock</span>
                    </button>
                </div>

                {/* Stocks List */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 w-full">
                    {stocks.length === 0 ? (
                        <div className="col-span-full text-center py-12 sm:py-16 border border-zinc-800 rounded-lg bg-zinc-950">
                            <svg
                                className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-4 text-zinc-700"
                                fill="none"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                            </svg>
                            <p className="text-zinc-500 text-sm sm:text-base">No stocks in your watchlist yet</p>
                            <p className="text-zinc-600 text-xs sm:text-sm mt-2">Click "Add Stock" to get started</p>
                        </div>
                    ) : (
                        stocks.map((stock) => (
                            <div
                                key={stock.id}
                                className="flex flex-col p-4 sm:p-5 bg-zinc-950 border border-zinc-800 rounded-lg hover:border-zinc-700 hover:shadow-lg hover:shadow-zinc-900/20 transition-all group"
                            >
                                <div className="flex items-start justify-between mb-3">
                                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-zinc-900 flex items-center justify-center ring-1 ring-zinc-800">
                                        <svg
                                            className="w-5 h-5 sm:w-6 sm:h-6 text-zinc-400"
                                            fill="none"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                                        </svg>
                                    </div>
                                    <button
                                        onClick={() => handleRemoveStock(stock.id)}
                                        className="p-1.5 sm:p-2 text-zinc-500 hover:text-red-500 hover:bg-zinc-900 rounded-lg transition-colors opacity-0 group-hover:opacity-100 hover:cursor-pointer"
                                        aria-label="Remove stock"
                                    >
                                        <svg
                                            className="w-4 h-4 sm:w-5 sm:h-5"
                                            fill="none"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                        </svg>
                                    </button>
                                </div>
                                <div>
                                    <h3 className="font-semibold text-base sm:text-lg text-zinc-100 mb-1 truncate">{stock.name}</h3>
                                    {/* <p className="text-xs text-zinc-500">
                                        Created {stock.createdAt.toISOString()}
                                    </p> */}
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>

            {/* Add Stock Dialog */}
            {isDialogOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
                    <div className="w-full max-w-md bg-zinc-950 border border-zinc-800 rounded-xl shadow-2xl animate-in zoom-in-95 duration-200">
                        {/* Dialog Header */}
                        <div className="flex items-center justify-between p-5 sm:p-6 border-b border-zinc-800">
                            <h2 className="text-lg sm:text-xl font-semibold">Add Stock to Watchlist</h2>
                            <button
                                onClick={() => {
                                    setIsDialogOpen(false)
                                    setStockName('')
                                }}
                                className="p-1.5 hover:bg-zinc-900 rounded-lg transition-colors"
                                aria-label="Close dialog"
                            >
                                <svg
                                    className="w-5 h-5"
                                    fill="none"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        {/* Dialog Content */}
                        <form onSubmit={handleAddStock} className="p-5 sm:p-6">
                            <label htmlFor="stockName" className="block text-sm font-medium mb-2 text-zinc-300">
                                Stock Name
                            </label>
                            <input
                                id="stockName"
                                type="text"
                                value={stockName}
                                onChange={(e) => {
                                    setStockName(e.target.value)
                                    setFeildErrors(" ")
                                }}
                                placeholder="e.g., AAPL, Tesla, MSFT"
                                className="w-full px-4 py-3 bg-black border border-zinc-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-zinc-600 focus:border-transparent transition-all placeholder:text-zinc-600 text-sm sm:text-base"
                                autoFocus
                            />

                            {feildErrors !== " " ? <p className='text-red-400 m-2 text-sm '>{feildErrors}</p> : null}
                            {/* Dialog Actions */}
                            <div className="flex flex-col sm:flex-row gap-3 mt-6">
                                <button
                                    type="button"
                                    onClick={() => {
                                        setIsDialogOpen(false)
                                        setStockName('')
                                    }}
                                    className="flex-1 px-4 py-2.5 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 rounded-lg transition-colors font-medium text-sm sm:text-base order-2 sm:order-1"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={!stockName.trim()}
                                    className="flex-1 px-4 py-2.5 bg-zinc-100 hover:bg-white text-black font-medium rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-zinc-100 shadow-lg hover:shadow-xl text-sm sm:text-base order-1 sm:order-2"
                                >
                                    Add Stock
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    )
}

export default WatchList