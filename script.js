let sliderElement = document.querySelector("#slider");
let buttonElement = document.querySelector("#button");
let checkboxElement = document.querySelector("#especialsCaracters");
let checkbox = false;
//listener para a checkbox - toda vez que clicada altera a vaeriael checkbox;
checkboxElement.addEventListener("click", function () {
  checkbox = !checkbox;
});

let sizePassword = document.querySelector("#value");
let password = document.querySelector("#password");
let containerPassword = document.querySelector("#container-password");

//declaração das senahas as serem utilizadas
let charset = "abcdefghijklmnopqrtuvxywzABCDEFGHIJKLMNOPQRSTUVXYWZ123456789";
let specials = "!@#$%&*/[]{}-+";
let newPassword = "";

//Definindo que o tamanho da senha será o mesmo do slider ao carregar a página
sizePassword.innerHTML = sliderElement.value;
//Atualiza o tamanho da senha sempre que o slide é alterado
slider.oninput = function () {
  sizePassword.innerHTML = this.value;
};

//Função para gerar a senha aleatóriamente
function generatePassword() {
  let pass = "";
  //for iterando no valor do slider = lenght
  for (let i = 0; i < sliderElement.value; i++) {
    //let pass recebendo aleatoriamente o char do let charset
    pass += charset.charAt(Math.floor(Math.random() * charset.length));
  }
  //definindo a nova senha;
  newPassword = pass;
  //se o checkbox for true chama a nova função
  if (checkbox) {
    addEspecialCaracters();
  }
  //removendo a class "hide" do containerPassword para que a senha sejá exibida
  containerPassword.classList.remove("hide");
  //mostrando a senha no html
  password.innerHTML = newPassword;
}

//adiciona caracteres especiais a senha
function addEspecialCaracters() {
  //pegando 1/3 do tamanho da senha para adicionar caracteres especiais
  for (let i = 0; i < newPassword.length / 3; i++) {
    //Selecionando um numero aleatório presente no lenght da senha
    let randomIndex = Math.floor(Math.random() * newPassword.length);
    //Selecionando um character aleatório presente em specials
    let randomSpecialChar = specials.charAt(
      Math.floor(Math.random() * specials.length)
    );
    //atribuindo a nova senha os novos caracteres.
    newPassword =
      newPassword.substring(0, randomIndex) +
      randomSpecialChar +
      newPassword.substring(randomIndex + 1);
  }
}

//função para copiar a senha gerada ao clicar na div
function copyPassword() {
  navigator.clipboard
    .writeText(newPassword)
    .then(function () {
      alert("Password copied to clipboard!");
    })
    .catch(function (err) {
      //caso o navegador não suporte o "navigator.clipboard.writeText" enviamos o erro ao usuário
      console.error("Failed to copy password to clipboard:", err);
      alert("Error!");
    });
}
