// Real product photos (Unsplash). Replace any URL with your own photo.
const u = (id) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=600&q=70`
export const categories = ['All','Clothes','Shoes','Slippers','Balls','School Supplies','Tools','Hardware','Electronics','Accessories']
export const products = [
 {id:1,name:'Classic White T-Shirt',cat:'Clothes',price:349,old:499,rating:4.5,img:u('photo-1521572163474-6864f9cf17ab')},
 {id:2,name:'Denim Jacket',cat:'Clothes',price:1299,old:1599,rating:4.6,img:u('photo-1576995853123-5a10305d93c0')},
 {id:3,name:'Running Shoes Red',cat:'Shoes',price:2499,old:2999,rating:4.8,img:u('photo-1542291026-7eec264c27ff')},
 {id:4,name:'Casual Sneakers',cat:'Shoes',price:1899,old:null,rating:4.4,img:u('photo-1491553895911-0055eca6402d')},
 {id:5,name:'Comfort Slippers',cat:'Slippers',price:249,old:349,rating:4.2,img:u('photo-1603487742131-4160ec999306')},
 {id:6,name:'Basketball',cat:'Balls',price:899,old:null,rating:4.7,img:u('photo-1546519638-68e109498ffc')},
 {id:7,name:'Soccer Ball',cat:'Balls',price:799,old:999,rating:4.5,img:u('photo-1614632537190-23e4146777db')},
 {id:8,name:'Notebook Set',cat:'School Supplies',price:199,old:249,rating:4.3,img:u('photo-1531346878377-a5be20888e57')},
 {id:9,name:'School Backpack',cat:'School Supplies',price:999,old:1299,rating:4.6,img:u('photo-1553062407-98eeb64c6a62')},
 {id:10,name:'Power Drill',cat:'Tools',price:3299,old:3899,rating:4.7,img:u('photo-1504148455328-c376907d081c')},
 {id:11,name:'Hand Tool Set',cat:'Tools',price:1599,old:null,rating:4.5,img:u('photo-1581783898377-1c85bf937427')},
 {id:12,name:'Screws & Nails Assortment',cat:'Hardware',price:299,old:null,rating:4.1,img:u('photo-1530124566582-a618bc2615dc')},
 {id:13,name:'Wireless Headphones',cat:'Electronics',price:2199,old:2799,rating:4.6,img:u('photo-1505740420928-5e560c06d30e')},
 {id:14,name:'Wrist Watch',cat:'Accessories',price:1799,old:2199,rating:4.4,img:u('photo-1523275335684-37898b6baf30')},
 {id:15,name:'Sunglasses',cat:'Accessories',price:599,old:null,rating:4.3,img:u('photo-1572635196237-14b3f281503f')}
]
