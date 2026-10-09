const menu=[
["TDS Special","Bun Maska",40,"bun-maska-new.jpg","Buttery bun maska, warm and freshly served."],

["Snacks","French Fries",89,"french-fries.jpg","Crispy golden fries."],
["Snacks","Peri Peri Fries",109,"peri-peri-fries.jpg","Spicy and crispy fries."],
["Snacks","Potato Wedges",109,"potato-wedges.jpg","Seasoned and crunchy potato wedges."],
["Snacks","Garlic Bread",99,"garlic-bread.jpg","Toasted bread with herbs and garlic."],
["Snacks","Cheese Garlic Bread",129,"cheese-garlic-bread.jpg","Garlic bread loaded with cheese."],
["Snacks","Nachos & Cheese",119,"nachos-cheese.jpg","Crunchy nachos with cheese dip."],
["Snacks","Veg Spring Rolls",119,"veg-spring-rolls.jpg","Crispy rolls with fresh veggies."],
["Snacks","Cheese Balls",129,"cheese-balls.jpg","Crunchy outside, cheesy inside."],
["Snacks","Chilli Cheese Toast",109,"chilli-cheese-toast.jpg","Spicy and cheesy toasted bites."],
["Snacks","Paneer Nuggets",139,"paneer-nuggets.jpg","Soft paneer with crispy coating."],


["Beverages","Masala Chai",20,"masala-chai-new.jpg","Warm Indian chai with aromatic spices."],
["Beverages","Green Tea",89,"https://tegaorganictea.com/cdn/shop/articles/GTM-20-Cup_3024x.png?v=1742089567","Light, refreshing green tea."],
["Beverages","Cold Coffee",119,"cold-coffee.jpg","Chilled coffee with cream and chocolate."],
["Beverages","Cappuccino",99,"cappuccino.jpg","Rich espresso with steamed milk foam."],
["Beverages","Café Latte",109,"cafe-latte.jpg","Smooth espresso with creamy steamed milk."],
["Beverages","Americano",89,"americano.jpg","Bold and refreshing black coffee."],
["Beverages","Café Mocha",119,"cafe-mocha.jpg","Coffee with rich chocolate flavour."],
["Beverages","Iced Latte",119,"iced-latte.jpg","Chilled espresso with cold milk."],
["Beverages","Virgin Mojito",109,"virgin-mojito.jpg","Mint, lime and soda — pure refreshment."],
["Beverages","Fresh Lime Soda",79,"fresh-lime-soda.jpg","Zesty, fizzy and fresh."],
["Beverages","Oreo Milkshake",149,"oreo-milkshake.jpg","Creamy milkshake with Oreo bites."],
["Beverages","Chocolate Milkshake",139,"chocolate-milkshake.jpg","Rich, thick and chocolatey."],
["Beverages","Peach Iced Tea",99,"peach-iced-tea.jpg","Fruity, refreshing and cool."],
["Beverages","Hot Chocolate",129,"hot-chocolate.jpg","Rich chocolate with whipped cream."],

["Desserts","Chocolate Brownie",99,"chocolate-brownie.jpg","Rich and fudgy."],
["Desserts","Brownie with Ice Cream",139,"brownie-ice-cream.jpg","Warm brownie with vanilla ice cream."],
["Desserts","Chocolate Lava Cake",149,"chocolate-lava-cake.jpg","Molten chocolate delight."],
["Desserts","Chocolate Sundae",129,"chocolate-sundae.jpg","Layers of chocolate and creamy ice cream."],
["Desserts","Vanilla Ice Cream",79,"vanilla-ice-cream.jpg","Classic and creamy."],
["Desserts","Chocolate Ice Cream",89,"chocolate-ice-cream.jpg","Rich and smooth chocolate ice cream."],
["Desserts","Oreo Sundae",139,"oreo-sundae.jpg","Cookies, cream and chocolate."],
["Desserts","Chocolate Mousse",119,"chocolate-mousse.jpg","Light and luxurious chocolate mousse."],
["Desserts","Caramel Custard",109,"caramel-custard.jpg","Silky and smooth."],
["Desserts","Nutella Brownie",149,"nutella-brownie.jpg","Chocolatey brownie with a rich spread."],

];

let cart=[]; let category="All";
const cats=["All","TDS Special","Snacks","Beverages","Desserts"];
document.getElementById("filters").innerHTML=cats.map(c=>`<button class="filter ${c==="All"?"active":""}" onclick="setCategory('${c}')">${c}</button>`).join("");
function setCategory(c){category=c;document.querySelectorAll(".filter").forEach(x=>x.classList.toggle("active",x.textContent===c));renderMenu()}
function renderMenu(){
 const q=document.getElementById("search").value.toLowerCase();
 const data=menu.filter(x=>(category==="All"||x[0]===category)&&x[1].toLowerCase().includes(q));
 document.getElementById("menuGrid").innerHTML=data.map((x,i)=>{
   const isImage = typeof x[3] === "string" &&
  (/^https?:\/\//.test(x[3]) || /\.(jpg|jpeg|png|webp|gif)$/i.test(x[3]));
   const visual=isImage ? `<img src="${x[3]}" alt="${x[1]}" loading="lazy">` : `<span>${x[3]}</span>`;
   return `<article class="food"><div class="food-img ${isImage?'photo':''}">${visual}</div><div class="food-body"><div class="food-cat">${x[0]}</div><h3>${x[1]}</h3><p>${x[4]}</p><div class="food-foot"><span class="price">₹${x[2]}</span><button class="add" onclick="addItem('${x[1].replace(/'/g,"\\'")}')">+ Add</button></div></div></article>`;
 }).join("")||"<p>No items found.</p>";
}
function addItem(name){const item=menu.find(x=>x[1]===name);const old=cart.find(x=>x.name===name);if(old)old.qty++;else cart.push({name:item[1],price:item[2],qty:1});updateCart();toast(name+" added to table order");}
function change(name,d){const x=cart.find(i=>i.name===name);if(!x)return;x.qty+=d;if(x.qty<=0)cart=cart.filter(i=>i.name!==name);updateCart()}
function removeItem(name){cart=cart.filter(i=>i.name!==name);updateCart();toast(name+' removed from cart');}
function updateCart(){
 const total=cart.reduce((s,x)=>s+x.price*x.qty,0);
 document.getElementById("cartCount").textContent=cart.reduce((s,x)=>s+x.qty,0);
 document.getElementById("subtotal").textContent="₹"+total;
 document.getElementById("modalTotal").textContent="₹"+total;
 document.getElementById("orderItems").innerHTML=cart.length?cart.map(x=>`<div class="order-row"><div><b>${x.name}</b><small>₹${x.price} each</small></div><div class="qty"><button onclick="change('${x.name}',-1)">−</button> ${x.qty} <button onclick="change('${x.name}',1)">+</button> <button class="remove-item" onclick="removeItem('${x.name}')" title="Remove from cart">Remove</button></div></div>`).join(""):"<p class='muted'>No items yet. Add something delicious from the menu.</p>";
 document.getElementById("modalItems").innerHTML=cart.length?cart.map(x=>`<div class="order-row"><span>${x.name} × ${x.qty}</span><b>₹${x.price*x.qty}</b></div>`).join(""):"<p class='muted'>Your cart is empty.</p>"; if(document.getElementById("checkout"))renderCheckout();
}
function openCart(){document.getElementById("cartModal").classList.add("show")}function closeCart(){document.getElementById("cartModal").classList.remove("show")}
let appliedCoupon = null;
let discountAmount = 0;
let orderTimers = [];

const couponRules = {
  TDS10:{type:"percent",value:10,label:"10% OFF"},
  STUDENT15:{type:"percent",value:15,label:"15% OFF"},
  WELCOME50:{type:"flat",value:50,min:300,label:"₹50 OFF"},
  CHAI20:{type:"percent",value:20,label:"20% OFF"}
};

function beginCheckout(){
  if(!cart.length){toast("Add an item first.");return}
  closeCart();
  renderCheckout();
  location.hash="checkout";
  setTimeout(()=>document.getElementById("checkout").scrollIntoView({behavior:"smooth"}),50);
}

function selectCoupon(code){
  document.getElementById("couponInput").value=code;
  document.querySelectorAll(".coupon-card").forEach(card=>card.classList.toggle("selected",card.textContent.includes(code)));
  applyCoupon();
}

function applyCoupon(){
  if(!cart.length){toast("Your cart is empty.");return}
  const code=document.getElementById("couponInput").value.trim().toUpperCase();
  const rule=couponRules[code];
  const subtotal=cart.reduce((s,x)=>s+x.price*x.qty,0);
  const msg=document.getElementById("couponMessage");
  if(!rule){
    appliedCoupon=null;discountAmount=0;
    msg.textContent="Invalid coupon. Try TDS10, STUDENT15, WELCOME50 or CHAI20.";
    msg.className="coupon-message error";
    updateCheckoutTotals();
    return;
  }
  if(rule.min && subtotal<rule.min){
    appliedCoupon=null;discountAmount=0;
    msg.textContent=`${code} works on orders of ₹${rule.min} or more.`;
    msg.className="coupon-message error";
    updateCheckoutTotals();
    return;
  }
  appliedCoupon=code;
  discountAmount=rule.type==="percent"?Math.round(subtotal*rule.value/100):rule.value;
  msg.textContent=`✓ ${code} applied — ${rule.label}`;
  msg.className="coupon-message success";
  document.querySelectorAll(".coupon-card").forEach(card=>card.classList.toggle("selected",card.textContent.includes(code)));
  updateCheckoutTotals();
  document.getElementById("sendOrderBtn").disabled=false;
  document.getElementById("sendOrderBtn").textContent="Send Order to Kitchen";
  toast("Coupon applied. Your order is ready to send.");
}

function renderCheckout(){
  document.getElementById("checkoutItems").innerHTML=cart.map(x=>`<div class="bill-line item-line"><span>${x.name} × ${x.qty}</span><b>₹${x.price*x.qty}</b></div>`).join("");
  updateCheckoutTotals();
}

function updateCheckoutTotals(){
  if(!document.getElementById("checkoutSubtotal"))return;
  const subtotal=cart.reduce((s,x)=>s+x.price*x.qty,0);
  const gst=Math.round((subtotal-discountAmount)*0.05);
  const total=subtotal-discountAmount+gst;
  document.getElementById("checkoutSubtotal").textContent="₹"+subtotal;
  document.getElementById("checkoutDiscount").textContent="−₹"+discountAmount;
  document.getElementById("checkoutGst").textContent="₹"+gst;
  document.getElementById("checkoutTotal").textContent="₹"+total;
}

function sendOrder(){
  if(!cart.length){toast("Add an item first.");return}
  if(!appliedCoupon){toast("Please apply a coupon first.");return}
  orderTimers.forEach(clearTimeout);
  orderTimers=[];
  document.getElementById("sendOrderBtn").disabled=true;
  document.getElementById("sendOrderBtn").textContent="✓ Order Sent";
  setStep(1);
  toast("Order sent to the kitchen!");
  document.getElementById("track").scrollIntoView({behavior:"smooth"});
  orderTimers.push(setTimeout(()=>setStep(2),2500));
  orderTimers.push(setTimeout(()=>setStep(3),5500));
  orderTimers.push(setTimeout(()=>{setStep(4);toast("Order served! Your bill is ready.");setTimeout(showBill,500)},8500));
}

function setStep(n){
  for(let i=1;i<=4;i++)document.getElementById("t"+i).classList.toggle("active",i<=n);
  document.getElementById("orderStatus").textContent=["Not placed","New Order","Preparing","Ready","Served"][n];
}

function showBill(){
  if(!cart.length)return;
  const subtotal=cart.reduce((s,x)=>s+x.price*x.qty,0);
  const gst=Math.round((subtotal-discountAmount)*0.05);
  const total=subtotal-discountAmount+gst;
  document.getElementById("billItems").innerHTML=cart.map(x=>`<div class="bill-line item-line"><span>${x.name} × ${x.qty}</span><b>₹${x.price*x.qty}</b></div>`).join("");
  document.getElementById("billSubtotal").textContent="₹"+subtotal;
  document.getElementById("billDiscount").textContent="−₹"+discountAmount;
  document.getElementById("billGst").textContent="₹"+gst;
  document.getElementById("billTotal").textContent="₹"+total;
  const now=new Date();
  document.getElementById("invoiceNo").textContent="TDS-"+now.getFullYear()+String(now.getMonth()+1).padStart(2,"0")+String(now.getDate()).padStart(2,"0")+"-"+String(Math.floor(Math.random()*900)+100);
  document.getElementById("invoiceDate").textContent=now.toLocaleString("en-IN",{dateStyle:"medium",timeStyle:"short"});
  document.getElementById("billModal").classList.add("show");
  setTimeout(printInvoice,450);
}
function printInvoice(){window.print()}
function closeBill(){document.getElementById("billModal").classList.remove("show")}
function request(type){const names={waiter:"Waiter",water:"Water",cutlery:"Extra cutlery",bill:"Bill"};toast((names[type]||type)+" request sent to staff.")}
function demoTable(){document.getElementById("tableNo").textContent="07";location.hash="menu";toast("Table 07 session started.")}
function toast(msg){const t=document.getElementById("toast");t.textContent=msg;t.classList.add("show");setTimeout(()=>t.classList.remove("show"),2200)}
renderMenu();updateCart();


let selectedRating = 0;
function setRating(n){
  selectedRating=n;
  document.querySelectorAll("#starPicker button").forEach((b,i)=>b.classList.toggle("selected",i<n));
}
function submitReview(){
  const name=(document.getElementById("reviewName").value||"Guest").trim();
  const review=document.getElementById("reviewText").value.trim();
  if(!selectedRating){toast("Please choose a star rating.");return}
  if(!review){toast("Please write a short review.");return}
  const card=document.createElement("article");
  card.className="review-card";
  const stars="★★★★★".slice(0,selectedRating)+"☆☆☆☆☆".slice(0,5-selectedRating);
  card.innerHTML=`<div class="review-top"><div class="avatar">${name.charAt(0).toUpperCase()}</div><div><b>${name.replace(/[<>]/g,"")}</b><small>Just now</small></div><span>${stars}</span></div><p>“${review.replace(/[<>]/g,"") }”</p>`;
  const list=document.querySelector(".reviews-list");
  list.insertBefore(card,list.querySelector(".write-review"));
  document.getElementById("reviewName").value="";
  document.getElementById("reviewText").value="";
  setRating(0);
  toast("Thanks! Your review was added.");
}
