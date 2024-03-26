let login = JSON.parse(localStorage.getItem("login")) || [];
let users = JSON.parse(localStorage.getItem("users")) || [];

let userName = document.getElementById("username-render");
for(let i = 0; i < users.length; i++){
    if(login === users[i].name || login === users[i].email){
        userName.innerText = users[i].name;
    }
}

function logout(event){
    localStorage.removeItem("login");
    document.querySelectorAll(".unlog").forEach(element => {
        element.style.display = "block";
    });
    document.getElementById("render-user").innerHTML = "";
}

function toMycart(event){
    window.location.href = "../pages/myCart.html";       
}

let product = JSON.parse(localStorage.getItem("product"));
let productImage = document.getElementById("image");
productImage.src = product.image;
document.getElementsByClassName("product-name")[0].innerText = product.name;
document.getElementsByClassName("product-price")[0].innerText = product.price + "đ";
document.getElementsByClassName("product-stock")[0].innerText = product.stock + " " + "sản phẩm có sẵn";
// console.log(productQuantity);



function addTocart(event){
    let productQuantity = parseInt(document.getElementById("productQuantity").value);
    let addProduct = {
        id: product.id,
        image: product.image,
        name: product.name,
        price: product.price,
        quantity: productQuantity,
    }
    for(let i = 0; i < users.length; i++){
        let currentUser = users[i];
        if(login === currentUser.name || login === currentUser.email){
            let userCart = currentUser.cart;
            console.log(userCart);
            let found = false;
            for(let j = 0; j < userCart.length; j++){
                if(addProduct.name === userCart[j].name){
                    userCart[j].quantity += parseInt(addProduct.quantity);
                    alert("Thêm số lượng sản phẩm thành công");
                    found = true;
                    break;
                }
            }
            if(!found){
                userCart.push(addProduct);
                alert("Thêm vào giỏ hàng thành công")
            }
            users[i].cart = userCart;
            localStorage.setItem("users", JSON.stringify(users));
            updateCartItemCount();
            break;
        }
    }
}
function updateCartItemCount(){
    let myCart;
    for(let i = 0; i < users.length; i++){
        if(login === users[i].name || login === users[i].email){
            myCart = users[i].cart;
        }
    }
    let itemAmount = myCart.length;
    let renderItemAmount = document.getElementsByClassName("item-amount")[0];
    if(itemAmount > 0){
        renderItemAmount.innerText = itemAmount;
        renderItemAmount.style.display = "block";
    }else{
        renderItemAmount.style.display = "none";

    }
}
updateCartItemCount();
