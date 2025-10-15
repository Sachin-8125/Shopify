import React from 'react'
import ProductBundle from '../components/ProductBundle'
import ProductVariants from '../components/ProductVariants'

export default function ProductPage() {
  return (
    <ProductBundle mainProductPrice={59.99}/>
    <ProductVariants colors={}/> 
  )
}
