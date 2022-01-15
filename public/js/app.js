// News container
let newsAccordion = document.getElementById("newsAccordion");

// Instantiate an xhr object
const xhr = new XMLHttpRequest();

// Defining data fetching source and apiKey
let source = `bbc-news`;
let apiKey = `bd902d47da664e2e9d140f3d2a223e7b`;

xhr.open(
    "GET",
    `https://newsapi.org/v2/top-headlines?sources=${source}&apiKey=${apiKey}`,
    true
);

xhr.onload = function () {
    if (this.status == 200) {
        let newsObj = JSON.parse(this.responseText);
        let articles = newsObj.articles;
        let newsHtml = "";
        articles.forEach((element, index) => {
            newsHtml += `<div class="accordion-item">
                        <h2 class="accordion-header" id="heading${index}">
                        <button
                        class="accordion-button collapsed"
                                type="button"
                                data-bs-toggle="collapse"
                                data-bs-target="#collapse${index}"
                                aria-expanded="true"
                                aria-controls="collapse${index}"
                                >
                                ${index + 1}: 
                                ${element["title"]}
                                </button>
                                </h2>
                        <div
                        id="collapse${index}"
                            class="accordion-collapse collapse"
                            aria-labelledby="heading${index}"
                            data-bs-parent="#newsAccordion"
                        >
                        <div class="accordion-body">
                            ${element["content"]}.....<a href = '${
                element["url"]
            }', target = '_blank' >Read more here</a>
                        </div>
                        </div>
                    </div>`;
        });
        newsAccordion.innerHTML = newsHtml;
    } else {
        newsHtml += `<div class="alert alert-warning alert-dismissible fade show" role="alert">
                        <strong>Sorry!</strong> We're facing some server related error
                        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                     </div>`;
        newsAccordion.innerHTML = newsHtml;
    }
};

xhr.send();
