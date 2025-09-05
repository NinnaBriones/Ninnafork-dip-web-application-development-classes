document.addEventListener("DOMContentLoaded", () => {
  const fetchApodButton = document.getElementById("fetch-apod");
  const apodContent = document.getElementById("apod-content");
  const apiKey = "GurS0wJyr12na3jhvOraArdY3bGr64N2ovBUUTh5";

  // --------------------------------------------------------------
  // Challenge 4
  // 1. Move the rendering logic (if/else for image/video/etc.)
  //    into reusable functions ready for modularisation

  // Renders ONE APOD item (image or video) -> returns an HTML string
  function renderOne(item) {
    if (!item || !item.media_type) {
      return `<p>Unexpected item format.</p>`;
    }

    if (item.media_type === "image") {
      return `
        <figure class="image is-4by3">
          <img src="${item.url}" alt="${item.title}">
        </figure>
        <h2 class="title is-4">${item.title ?? "Untitled"}</h2>
        <p>${item.explanation ?? ""}</p>
      `;
    }

    if (item.media_type === "video") {
      return `
        <div class="video-apodContent">
          <iframe src="${item.url}" frameborder="0" allowfullscreen></iframe>
        </div>
        <h2 class="title is-4">${item.title ?? "Untitled"}</h2>
        <p>${item.explanation ?? ""}</p>
      `;
    }

    return `<p>Media type not supported: ${item.media_type}</p>`;
  }

  // Handles SINGLE object or ARRAY of items and writes to the page
  function displayApod(data) {
    apodContent.innerHTML = "";
    const items = Array.isArray(data) ? data : [data];

    if (items.length === 0) {
      apodContent.innerHTML = "<p>No results.</p>";
      return;
    }

    apodContent.innerHTML = items.map(renderOne).join("");
  }
  // --------------------------------------------------------------

  fetchApodButton.addEventListener("click", (e) => {
    e.preventDefault(); // stop the form from reloading the page

    const date = document.getElementById("date").value;
    const startDate = document.getElementById("start_date").value;
    const endDate = document.getElementById("end_date").value;
    const count = document.getElementById("count").value;
    const thumbs = document.getElementById("thumbs").checked;

    // --------------------------------------------------------------
    // Challenge 1
    // 1. Check all the form fields to see which fields have data
    // 2. Add them to the apiURL as parameters
    // 3. Test the responses in the Network tab
    const params = new URLSearchParams({ api_key: apiKey });

    if (date) {
      // single day
      params.set("date", date);
    } else if (startDate && endDate) {
      // date range
      params.set("start_date", startDate);
      params.set("end_date", endDate);
    } else if (count && Number(count) > 0) {
      // random N items
      params.set("count", String(Number(count)));
    }
    if (thumbs) {
      params.set("thumbs", "true");
    }

    const apiUrl = `https://api.nasa.gov/planetary/apod?${params.toString()}`;
    apodContent.innerHTML = `<p>Fetching: <code>${apiUrl}</code></p>`;

    // --------------------------------------------------------------
    // Challenge 2
    // 1. Add headers to the API call: Accept + Cache-Control
    // 2. Set cache to "no-store" and Cache-Control to "no-cache"
    // 3. Test the responses in the Network tab
    const fetchOptions = {
      method: "GET",
      cache: "no-store",
      headers: {
        "Accept": "application/json",
        "Cache-Control": "no-cache"
      }
    };

    fetch(apiUrl, fetchOptions)
      // --------------------------------------------------------------
      // Challenge 3
      // 1. Check if the response code is 200 (ok)
      // 2. If ok, return response.json()
      // 3. If not ok, throw a new error with the status code
      // 4. Test the responses in the Network tab
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
      })
      .then((data) => {
        // Challenge 4: use the reusable renderer
        displayApod(data);
      })
      .catch((error) => {
        apodContent.innerHTML = `<p>Error fetching item: ${error.message}</p>`;
      });
  });
});

