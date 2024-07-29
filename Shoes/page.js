let bar = document.querySelector(".right");
let menu = document.querySelector(".sidebar");
let exit = document.querySelector("#exit");

bar.onclick = function () {
  menu.classList.add("show");
};

exit.onclick = function () {
  menu.classList.remove("show");
};

let input = document.querySelector(".form input:first-of-type");
function scrollToTop() {
  input.focus();
  const scrollDuration = 500;
  const scrollStep = -window.scrollY / (scrollDuration / 15);
  const scrollInterval = setInterval(() => {
    if (window.scrollY !== 0) {
      window.scrollBy(0, scrollStep);
    } else {
      clearInterval(scrollInterval);
    }
  }, 15);
}


document.getElementById("phoneNumber").addEventListener("input", function() {
  if (this.value.length > 10) {
      this.value = this.value.slice(0, 10);
  }
});


let communeData = [];

const filePath = 'communeData.json';

fetch(filePath)
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => {
    communeData = data;
    console.log('Data loaded successfully:', communeData);
    document.getElementById('wilayas').addEventListener('change', updateCommunes);
  })
  .catch(error => {
    console.error('Error loading JSON:', error);
  });

function updateCommunes() {
  const wilayaSelect = document.getElementById('wilayas');
  const communeSelect = document.getElementById('commune');
  const selectedWilaya = wilayaSelect.value;

  communeSelect.innerHTML = '<option value="" hidden>البلدية</option>';

  const filteredCommunes = communeData.filter(commune => commune.wilaya_id === selectedWilaya);

  if (filteredCommunes.length > 0) {
    communeSelect.setAttribute('required', 'required');
    communeSelect.classList.remove('disabled');
    communeSelect.removeAttribute('disabled');
  } else {
    communeSelect.removeAttribute('required');
    communeSelect.classList.add('disabled');
    communeSelect.setAttribute('disabled', 'disabled');
  }

  filteredCommunes.forEach(commune => {
    const option = document.createElement('option');
    option.value = commune.ar_name;
    option.textContent = commune.ar_name;
    communeSelect.appendChild(option);
  });
}


//////////////////////////////////////



