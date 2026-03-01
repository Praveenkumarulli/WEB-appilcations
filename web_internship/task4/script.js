document.getElementById("contactForm").addEventListener("submit", function(e){
    e.preventDefault();

    document.getElementById("successMsg").innerText =
        "✔ Form submitted successfully!";

    this.reset();
});