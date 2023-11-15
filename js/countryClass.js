export default class Country{
    constructor(_parent, _country){
        this.name = _country.name.common;
        this.population = _country.population;
        this.flag = _country.flags.png;
        this.flag_alt = _country.flags.alt;
        this.capital = _country.capital;
        this.lat = _country.latlng[0];
        this.lan = _country.latlng[1];
        this.lang = _country.languages;
        this.borders = _country.borders;
        this.parent = _parent;
    }

    render(){

    }

    renderSmallInfo(){
        let country = document.createElement("div");
        country.className = "country card col-lg-2 col-md-4";
        country.innerHTML = `
        <img src="${this.flag}" class="card-img-top" alt="${this.flag_alt}" />
        <div class="card-body">
          <h5 class="card-title">${this.name}</h5>
          <a href="#" class="btn btn-primary">For more info</a>
        </div>
        `;

        country.querySelector("a").addEventListener("click", () =>{
            showCountry(this.name);
        })

        console.log(this.parent);
        document.querySelector(this.parent).append(country);
    }
}