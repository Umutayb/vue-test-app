<template>
         <div class="page">
           <h1>Product Carousel</h1>
           <p class="page-desc">Product showcase with real images for visual testing</p>

           <!-- Featured product carousel -->
           <div class="carousel-wrapper" data-testid="product-carousel">
             <div class="carousel-viewport">
               <div
                 v-for="(product, i) in products"
                 :key="product.id"
                 class="carousel-slide"
                 :data-testid="`product-slide-${i}`"
                 v-show="currentSlide === i"
               >
                 <img
                   :src="product.image"
                   :alt="product.name"
                   :data-testid="`product-image-${i}`"
                   class="carousel-image"
                   @error="handleImageError($event, product)"
                 />
                 <div class="slide-info">
                   <h2 :data-testid="`product-name-${i}`">{{ product.name }}</h2>
                   <p class="product-price" :data-testid="`product-price-${i}`">{{ product.price }}</p>
                   <p class="product-desc">{{ product.description }}</p>
                 </div>
               </div>
             </div>

             <button class="nav-btn prev-btn" data-testid="product-carousel-prev" @click="prev">&#8249;</button>
             <button class="nav-btn next-btn" data-testid="product-carousel-next" @click="next">&#8250;</button>
           </div>

           <!-- Dots -->
           <div class="dots-row">
             <button
               v-for="(product, i) in products"
               :key="i"
               class="dot"
               :class="{ 'dot-active': currentSlide === i }"
               :data-testid="`product-dot-${i}`"
               @click="goTo(i)"
             ></button>
           </div>

           <p class="indicator" data-testid="product-carousel-indicator">
             {{ currentSlide + 1 }} / {{ products.length }}
           </p>

           <!-- Product grid with images -->
           <h2 class="section-title">All Products</h2>
           <div class="product-grid" data-testid="product-grid">
             <div
               v-for="(product, i) in products"
               :key="product.id"
               class="product-card"
               :data-testid="`product-card-${i}`"
             >
               <img
                 :src="product.thumbnail"
                 :alt="product.name"
                 :data-testid="`product-thumb-${i}`"
                 class="product-thumb"
                 @error="handleImageError($event, product)"
               />
               <div class="card-info">
                 <h3>{{ product.name }}</h3>
                 <p class="product-price">{{ product.price }}</p>
               </div>
             </div>
           </div>
         </div>
       </template>

       <script>
       export default {
         data() {
           return {
             currentSlide: 0,
             products: [
               {
                 id: 1,
                 name: 'Wireless Headphones',
                 price: '$79.99',
                 description: 'Premium noise-cancelling over-ear headphones',
                 image: 'https://picsum.photos/seed/headphones/600/400',
                 thumbnail: 'https://picsum.photos/seed/headphones/300/200',
               },
               {
                 id: 2,
                 name: 'Smart Watch',
                 price: '$199.99',
                 description: 'Fitness tracking with heart rate monitoring',
                 image: 'https://picsum.photos/seed/smartwatch/600/400',
                 thumbnail: 'https://picsum.photos/seed/smartwatch/300/200',
               },
               {
                 id: 3,
                 name: 'Portable Speaker',
                 price: '$49.99',
                 description: 'Waterproof bluetooth speaker with 12h battery',
                 image: 'https://picsum.photos/seed/speaker/600/400',
                 thumbnail: 'https://picsum.photos/seed/speaker/300/200',
               },
               {
                 id: 4,
                 name: 'Laptop Stand',
                 price: '$34.99',
                 description: 'Adjustable aluminum ergonomic stand',
                 image: 'https://picsum.photos/seed/laptopstand/600/400',
                 thumbnail: 'https://picsum.photos/seed/laptopstand/300/200',
               },
               {
                 id: 5,
                 name: 'Mechanical Keyboard',
                 price: '$129.99',
                 description: 'RGB backlit with cherry MX switches',
                 image: 'https://picsum.photos/seed/keyboard/600/400',
                 thumbnail: 'https://picsum.photos/seed/keyboard/300/200',
               },
               {
                 id: 6,
                 name: 'USB-C Hub',
                 price: '$44.99',
                 description: '7-in-1 multiport adapter with HDMI and SD card',
                 image: 'https://picsum.photos/seed/usbhub/600/400',
                 thumbnail: 'https://picsum.photos/seed/usbhub/300/200',
               },
             ],
           };
         },
         methods: {
           prev() {
             this.currentSlide = (this.currentSlide - 1 + this.products.length) % this.products.length;
           },
           next() {
             this.currentSlide = (this.currentSlide + 1) % this.products.length;
           },
           goTo(i) {
             this.currentSlide = i;
           },
           handleImageError(event, product) {
             event.target.alt = `Failed to load: ${product.name}`;
           },
         },
       };
       </script>

       <style scoped>
       .page { padding: 2rem; max-width: 900px; }
       .page-desc { color: var(--text-secondary); margin-bottom: 2rem; }

       /* Carousel */
       .carousel-wrapper {
         position: relative;
         border-radius: var(--radius);
         overflow: hidden;
         border: 1px solid var(--border);
         background: var(--bg-sidebar);
       }
       .carousel-viewport { position: relative; }
       .carousel-slide {
         display: flex;
         flex-direction: column;
       }
       .carousel-image {
         width: 100%;
         height: 300px;
         object-fit: cover;
         display: block;
       }
       .slide-info {
         padding: 1rem 1.25rem;
       }
       .slide-info h2 { margin: 0 0 0.25rem 0; font-size: 1.1rem; }
       .product-price { font-weight: 600; color: var(--accent); margin: 0 0 0.25rem 0; }
       .product-desc { color: var(--text-secondary); font-size: 0.85rem; margin: 0; }

       .nav-btn {
         position: absolute;
         top: 150px;
         transform: translateY(-50%);
         background: rgba(0,0,0,0.4);
         border: none;
         color: #fff;
         font-size: 1.75rem;
         cursor: pointer;
         padding: 0.5rem 0.75rem;
         transition: background 0.15s;
       }
       .prev-btn { left: 0; border-radius: 0 var(--radius) var(--radius) 0; }
       .next-btn { right: 0; border-radius: var(--radius) 0 0 var(--radius); }
       .nav-btn:hover { background: rgba(0,0,0,0.6); }

       .dots-row {
         display: flex;
         justify-content: center;
         gap: 0.5rem;
         margin-top: 1rem;
       }
       .dot {
         width: 10px; height: 10px; border-radius: 50%;
         background: var(--border); border: none; cursor: pointer; padding: 0;
         transition: background 0.15s;
       }
       .dot-active { background: var(--accent); }

       .indicator {
         text-align: center;
         font-size: 0.8rem;
         color: var(--text-muted);
         margin-top: 0.5rem;
       }

       /* Product grid */
       .section-title {
         font-size: 1.1rem;
         margin: 2rem 0 1rem;
       }
       .product-grid {
         display: grid;
         grid-template-columns: repeat(3, 1fr);
         gap: 1rem;
       }
       .product-card {
         border: 1px solid var(--border);
         border-radius: var(--radius);
         overflow: hidden;
         background: var(--bg-sidebar);
         transition: box-shadow 0.15s;
       }
       .product-card:hover {
         box-shadow: 0 2px 8px rgba(0,0,0,0.1);
       }
       .product-thumb {
         width: 100%;
         height: 140px;
         object-fit: cover;
         display: block;
       }
       .card-info {
         padding: 0.75rem;
       }
       .card-info h3 { margin: 0 0 0.25rem 0; font-size: 0.9rem; }
       .card-info .product-price { font-size: 0.85rem; margin: 0; }

       @media (max-width: 768px) {
         .product-grid { grid-template-columns: repeat(2, 1fr); }
         .carousel-image { height: 200px; }
       }
       @media (max-width: 480px) {
         .product-grid { grid-template-columns: 1fr; }
       }
       </style>