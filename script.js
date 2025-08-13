function fazerLogin(){
  const u=document.getElementById("usuario").value.trim();
  const s=document.getElementById("senha").value.trim();
  if(u==="mariabonita" && s==="91453710"){
    localStorage.setItem("logado","true");
    mostrarPagina();
    document.getElementById("erro").style.display="none";
  }else document.getElementById("erro").style.display="block";
}

function mostrarPagina(){
  document.getElementById("login-container").style.display="none";
  document.getElementById("menu").style.display="block";
}

// Menu hamburger
document.addEventListener("DOMContentLoaded",()=>{
  if(localStorage.getItem("logado")==="true") mostrarPagina();
  const ham=document.getElementById("hamburger");
  const menu=document.getElementById("mobile-menu");
  ham.addEventListener("click",()=>menu.classList.toggle("active"));
  document.querySelector(".cart").addEventListener("click",mostrarCarrinho);
});

// Carrinho
const carrinho=[];
function adicionarAoCarrinho(nome,codigo,preco){
  const item=carrinho.find(i=>i.codigo===codigo);
  if(item)item.quantidade+=1;
  else carrinho.push({nome,codigo,preco,quantidade:1});
  atualizarCarrinho();
  mostrarCarrinho();
}

function atualizarCarrinho(){
  const container=document.getElementById("cart-items");
  container.innerHTML="";
  let subtotal=0;
  carrinho.forEach((item,index)=>{
    const precoNum=parseFloat(item.preco.replace("R$","").replace(",","."));
    subtotal+=precoNum*item.quantidade;
    const div=document.createElement("div");
    div.classList.add("cart-item");
    div.innerHTML=`<div class="cart-item-name">${item.nome}</div>
      <div class="cart-item-actions">Qtd: ${item.quantidade} <button onclick="removerItem(${index})">Excluir</button></div>`;
    container.appendChild(div);
  });
  document.getElementById("subtotal").textContent=`Subtotal: R$${subtotal.toFixed(2).replace(".",",")}`;
  document.getElementById("total").textContent=`Total: R$${subtotal.toFixed(2).replace(".",",")}`;
  document.getElementById("desconto").textContent=`Desconto: R$0,00`;
}

function mostrarCarrinho(){document.getElementById("cart-container").style.display="block";}
function fecharCarrinho(){document.getElementById("cart-container").style.display="none";}
function removerItem(index){carrinho.splice(index,1);atualizarCarrinho();}
function finalizarCompra(){
  if(carrinho.length===0){alert("Carrinho vazio!"); return;}
  let msg="Olá! Tenho interesse nos seguintes produtos:%0A";
  carrinho.forEach(i=>msg+=`• ${i.nome} - ${i.preco} x ${i.quantidade}%0A`);
  window.open(`https://wa.me/554789257740?text=${msg}`,"_blank");
}
