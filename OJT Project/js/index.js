window.onscroll = function(){fixedHeader()};
var header = document.getElementsByClassName("header");
var sticky = header.offsetTop;

function fixedHeader(){
    if (window.scrollY > sticky) {
        header.classList.add("sticky");
    }else{
        header.classList.remove("sticky");
    }
}
var slideIndex = 0;
showSlides();
var slides,dots;

function showSlides() {
    var i;
    slides = document.getElementsByClassName("banner-slides");
    dots = document.getElementsByClassName("dot");
    for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";  
    }
    slideIndex++;
    if (slideIndex > slides.length) {slideIndex = 1}    
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slideIndex-1].style.display = "block";  
    dots[slideIndex-1].className += " active";
    setTimeout(showSlides, 3000); 
}

function plusSlides(position) {
    slideIndex +=position;
    if (slideIndex> slides.length) {slideIndex = 1}
    else if(slideIndex<1){slideIndex = slides.length}
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";  
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slideIndex-1].style.display = "block";  
    dots[slideIndex-1].className += " active";
    }

    function currentSlide(index) {
    if (index> slides.length) {index = 1}
    else if(index<1){index = slides.length}
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";  
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[index-1].style.display = "block";  
    dots[index-1].className += " active";
}

let products = JSON.parse(localStorage.getItem("products"));

let productInfo = document.getElementsByClassName("product-line")[0];
function renderProduct(){
    let text = "";
    for(let i = 0; i < products.length; i++){
        text += 
        `
        <div role="button" onclick="toProductpage(${products[i].id})" class="product-content">
            <div class="product-image">
                <img src="${products[i].image}" alt="${products[i].name}">
            </div>
            <div class="product-details">
                <div class="product-name">${products[i].name}</div>
                <div class="product-price">${products[i].price}đ</div>
            </div>
        </div>
        `
    }
    productInfo.innerHTML = text;
}
renderProduct();

let login = JSON.parse(localStorage.getItem("login")) || [];
let users = JSON.parse(localStorage.getItem("users")) || [];

if(login != ""){
    document.querySelectorAll(".unlog").forEach(element => {
        element.style.display = "none";
    });
    for(let i = 0; i < users.length;i++){
        if(login === users[i].email || login === users[i].name){
            document.getElementById("render-user").innerHTML = 
            `
            <div class="user-nav">
                <a href="#" class="user-logo">
                    <i class="fa-solid fa-user"></i>
                    ${users[i].name}
                </a>
                <div class="user-nav-dropdown">
                    <div class="dropdown-items-container">
                        <div class="dropdown-item"><a href="">Tài khoản của tôi</a></div>
                        <div class="dropdown-item"><a href="">Đơn mua</a></div>
                        <div class="dropdown-item"><a onclick="logout(event)" href="./index.html">Đăng xuất</a></div>
                    </div>
                </div>
            </div>
            `;
        }
    }
}else{
    document.querySelectorAll(".unlog").forEach(element => {
        element.style.display = "block";
    });
    document.getElementById("render-user").innerHTML = "";
}

function logout(event){
    localStorage.removeItem("login");
    document.querySelectorAll(".unlog").forEach(element => {
        element.style.display = "block";
    });
    document.getElementById("render-user").innerHTML = "";
}

function toMycart(event){
    if(login == ""){
        window.location.href = "./pages/loginShopping.html";
    }else{
        window.location.href = "./pages/myCart.html";       
    }
}

function toProductpage(productId){
    if(login == ""){
        window.location.href = "./pages/loginShopping.html";
    }else{
        for(let i = 0; i < users.length; i++){
            if(!users[i].status){
                alert("Tài khoản của bạn bị khóa chức năng mua hàng, vui lòng liên hệ tới bộ phận hỗ trợ để được giải quyết.");
                window.location.href = "./index.html";
            }else{
                for(let i = 0; i < products.length; i++){
                    if(productId === products[i].id){
                        let product = {
                            id: products[i].id,
                            image: products[i].image,
                            name: products[i].name,
                            price: products[i].price,
                            stock: products[i].stock,
                        }
                        localStorage.setItem("product", JSON.stringify(product));
                    }
                }
                window.location.href = "./pages/product.html";
            }
        }
    }
}

let myCart;
for(let i = 0; i < users.length; i++){
    if(login === users[i].email || login === users[i].name){
        myCart = users[i].cart;
    }
}

function addTocart(event){
    let productQuantity = parseInt(document.getElementById("productQuantity").value);
    let addProduct = {
        id: product.id,
        image: product.image,
        name: product.name,
        price: product.price,
        quantity: productQuantity,
    }
    let found = false;
    for(let i = 0; i < myCart.length; i++){
        if(addProduct.name === myCart[i].name){
            myCart[i].quantity += parseInt(addProduct.quantity);
            found = true;
            break;
        }
    }
    if(!found){
        myCart.push(addProduct);
    }
    localStorage.setItem("myCart", JSON.stringify(myCart));
    updateCartItemCount();
}
function updateCartItemCount(){
    let myCart;
    for(let i = 0; i < users.length; i++){
        if(login === users[i].email || login === users[i].name){
            myCart = users[i].cart;
        }
    }
    let itemAmount = myCart.length;
    let renderItemAmount = document.getElementsByClassName("item-amount")[0];
    if(login == ""){
        renderItemAmount.style.display = "none";
    }else{
        if(itemAmount > 0){
            renderItemAmount.innerText = itemAmount;
            renderItemAmount.style.display = "block";
        }else{
            renderItemAmount.style.display = "none";
    
        }
    }
}
updateCartItemCount();

// let products = [
//     {
//         id: 1,
//         image: "../asset/images/vn-11134201-7r98o-lsjbid51upo256.jfif",
//         name: "Giày thể thao nam Under Armour Machina 3",
//         price: "2.867.000",
//         stock: 999,
//         date: "20/3/2024"
//     },
//     {
//         id: 2,
//         image: "https://down-vn.img.susercontent.com/file/sg-11134201-7rbmu-lpb1z9bqd2byb3",
//         name: "Giầy Chạy Bộ Thể Thao Nam LINING ARST081",
//         price: "1.054.700",
//         stock: 999,
//         date: "20/3/2024"
//     },
//     {
//         id: 3,
//         image: "https://down-vn.img.susercontent.com/file/cecd353d5e744bcff3d196085a35e30b",
//         name: "Gấu bông TOTORO mềm mịn béo tròn cao 40cm",
//         price: "50.000",
//         stock: 999,
//         date: "20/3/2024"
//     },
//     {
//         id: 4,
//         image: "https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-llor0zdwacpr42",
//         name: "Áo thun giữ nhiệt nam body đá bóng",
//         price: "35.000",
//         stock: 999,
//         date: "20/3/2024"
//     },
//     {
//         id: 5,
//         image: "https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-lmabmozk71en12",
//         name: "Túi đeo chéo, túi đeo vai vải canvas Hàn Quốc",
//         price: "39.000",
//         stock: 999,
//         date: "20/3/2024"
//     },
//     {
//         id: 6,
//         image: "https://down-vn.img.susercontent.com/file/sg-11134201-7rbnk-ln8h4j6fyhe3c2",
//         name: "[chamer] Móc Khóa Thỏ Nhồi Bông Lông",
//         price: "20.066",
//         stock: 999,
//         date: "20/3/2024"
//     },
//     {
//         id: 7,
//         image: "https://down-vn.img.susercontent.com/file/sg-11134201-22110-jltze8h0g1jvf9",
//         name: "MÓC KHOÁ 12 CHÒM SAO CUNG HOÀNG ĐẠO PHÁT QUANG",
//         price: "18.000",
//         stock: 999,
//         date: "20/3/2024"
//     },
//     {
//         id: 8,
//         image: "https://down-vn.img.susercontent.com/file/d9f3134daf60fbc18cce81f7b3546bab",
//         name: "[TẶNG KÈM PIN] Đèn Ngủ Silicon Hình Mèo Cảm biến Đáng yêu",
//         price: "25.000",
//         stock: 999,
//         date: "20/3/2024"
//     },
//     {
//         id: 9,
//         image: "https://down-vn.img.susercontent.com/file/vn-11134201-7r98o-lsjbfh3u3dated",
//         name: "Giày thể thao nam Columbia Plateau™ Waterproof",
//         price: "1.794.000",
//         stock: 999,
//         date: "20/3/2024"
//     },
//     {
//         id: 10,
//         image: "https://down-vn.img.susercontent.com/file/vn-11134207-7qukw-lh4i4p7w2khe56",
//         name: "Nón Cói, Nói du lịch, Nón đi biển, Nón Cosplay nhân vật hoạt hình",
//         price: "79.000",
//         stock: 999,
//         date: "20/3/2024"
//     },
//     {
//         id: 11,
//         image: "https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-ll7oe3p8mv2gb3",
//         name: "Móc Khoá Mô Hình Genshin Impact - dài 12cm",
//         price: "21.000",
//         stock: 999,
//         date: "20/3/2024"
//     },
//     {
//         id: 12,
//         image: "https://down-vn.img.susercontent.com/file/vn-11134207-7qukw-ljsb2py9zttg3d",
//         name: "Lót chuột cỡ lớn lỗi nhẹ, in lỗi chuyên game siêu bền đẹp",
//         price: "20.066",
//         stock: 999,
//         date: "20/3/2024"
//     },
// ]