"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { ProductApiModel, ProductDataModel } from "@/model/data/interfaces";
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
import { productFetch } from "@/model/api/ProductFetch";



export default function products() {
  const [products, setProducts] = useState<ProductDataModel[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);
      try {
        const api = await productFetch();
        
        const response = await axios.get<ProductApiModel>(`${api}`);

        if (response.data.succcess) {
          setProducts(response.data.data);
        } else {
          setError(response.data.message || "Failed to fetch products");
        }
      } catch (err) {
        setError("An error occurred while fetching products");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) return <p>Loading products...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div>
      <BentoGrid className="max-w-4xl mx-auto">
        {products.length === 0 ? (
          <p>No products found.</p>
        ) : (
          products.map((item, i) => (
            <BentoGridItem
              key={i}
              title={item.name}
              description={item.description}
              header={Skeleton()}
              icon={""}
              className={"md:col-span-1"}
            />
          ))
        )}
      </BentoGrid>
    </div>
  );
}


const Skeleton = () => (
  <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-neutral-200 dark:from-neutral-900 dark:to-neutral-800 to-neutral-100"></div>
);
