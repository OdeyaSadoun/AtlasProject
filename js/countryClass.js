export default class Country {
  constructor(_parent, _country) {
    this.name = _country.name.common;
    this.population = _country.population;
    this.flag = _country.flags.png;
    this.flag_alt = _country.flags.alt;
    this.capital = _country.capital;
    this.lat = _country.latlng ? _country.latlng[0] : undefined;
    this.lon = _country.latlng ? _country.latlng[1] : undefined;
    this.lang = this.findLanguages(_country);
    this.borders = _country.borders;
    this.parent = _parent;
  }

  findLanguages(_country) {
    if (!_country.languages || Object.keys(_country.languages).length === 0) {
      return undefined;
    }
    let langs_ar = [];
    if (Object.keys(_country.languages).length > 1) {
      langs_ar = Object.values(_country.languages);
    } else {
      langs_ar = [_country.languages[Object.keys(_country.languages)[0]]];
    }
    return langs_ar;
  }

  render(callApiByCode, showCountry, callApiByName) {
    let div = document.createElement("div");
    div.innerHTML = `
      <div class="map col-md-6 d-flex align-items-center my-5 px-2">
        <iframe width="100%" height="100%" frameborder="0" scrolling="no" marginheight="0" marginwidth="0"
            src="https://maps.google.com/maps?q=${this.lat},${
      this.lon
    }&hl=en&z=6&amp;output=embed">
        </iframe>
      </div>
      <div class="country_single col-md-6 align-items-center my-5 px-2">
        <div class="flag-out">
          <div class="flag border-bottom border-top border-end border-5 border-black">
            <img src="${this.flag}" alt="${this.flag_alt}" />
          </div>
          <div class="country_info">
            <h2 class="display-6 fw-bold text-center p-4">${this.name}</h2>
            <p class="lead px-5"><strong>Population:</strong> ${Number(
              this.population
            ).toLocaleString()}</p>
            <p class="lead px-5"><strong>Capital:</strong> ${this.capital}</p>
            <p class="lead px-5"><strong>Language:</strong> ${this.lang}</p>
            <p class="lead px-5 borders_countries"><strong>Borders:</strong> ${this.createBordersFromCodeName(
              callApiByCode,
              showCountry,
              callApiByName
            )} <span></span></p>
          </div>
        </div>
      </div>
      `;
    div.className = "container-info d-flex mx-auto justify-content-between";

    document.querySelector(this.parent).append(div);
  }

  createBordersFromCodeName(callApiByCode, showCountry, callApiByName) {
    if (this.borders && this.borders.length > 0) {
      this.borders.forEach((border, index) => {
        callApiByCode(border).then((data) => {
          let a = document.createElement("a");
          let inner = `
          <a href="#">${data[0].name.common}</a>
          `;
          if (index == this.borders.length - 1) {
            a.innerHTML = `${inner}.`;
          } else {
            a.innerHTML = `${inner}, `;
          }

          document.querySelector(".borders_countries span").append(a);

          a.addEventListener("click", () => {
            showCountry(data[0].name.common, callApiByName, callApiByCode);
          });
        });
      });
      return "";
    } else {
      return "no borders";
    }
  }

  renderSmallInfo(showCountry, callApiByName, callApiByCode) {
    let country = document.createElement("div");
    country.className = "country card col-lg-2 col-md-4 mx-3 my-5  p-3 ";
    country.innerHTML = `
        <div class="d-flex align-items-center image_flag_small_info">
        <img src="${this.flag}" class="card-img-top" alt="${this.flag_alt}" />
        </div>
        <div class="card-body text-center p-2">
          <h5 class="card-title my-3">${this.name}</h5>
          <a href="#" class="btn btn-outline-secondary">For more info</a>
        </div>
        `;
    country.querySelector("a").addEventListener("click", () => {
      showCountry(this.name, callApiByName, callApiByCode);
    });

    document.querySelector(this.parent).append(country);
  }
}
