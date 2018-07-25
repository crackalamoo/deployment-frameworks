<template lang="html">
  <div>
    <h1>{{ companyName }}</h1>
    <img class="small" :src="imageLink">
    <a><p v-on:click="goBack()">Click here to return to the main screen</p></a><br><br>
    <h2>{{ nameInfo }}</h2>
    <h3>{{ descriptionInfo }}</h3>
    <p>{{ priceInfo }}</p>
    <p>{{ quantityInfo }}</p>
    <br><br><br><br>
  </div>
</template>

<script>
export default {
  props: ['id', 'company'],

  data () {
    return {
      name: "",
      price: "",
      originalPrice: "",
      description: "",
      imageLink: "",
      companyName: "",
      quantity: ""
    }
  },

  computed: {
    nameInfo() {
      if (this.name) {return this.name
      } else {return ""}
    },
    descriptionInfo() {
      if (this.description) {return this.description
      } else {return ""}
    },
    priceInfo() {
      var text = "";
      console.log("Working");
      if (this.price) {text = text + "Price $" + this.price;
      } else {text = text + "Loading information";}
      if (this.originalPrice) {text = text + ", Original price $" + this.originalPrice;}
      return text
    },
    quantityInfo() {
      if (this.quantity) {return this.quantity + " left"
      } else {return ""}
    }
  },

  methods: {
    getAllPosts: function() {
      this.httpGetAsync("http://taptobook-qa.azurewebsites.net/api/version/3_1/ProviderAsync/GetHashCodeDetails?hashCode=" + this.company + "&resetShowChat=true&updateAnalytics=false", this.responseFunction);
    },
    responseFunction: function(jsonData) {
      console.log("Retrieving data...");
      this.originalPrice = "";
      this.price = "";
      this.description = "";
      this.quantity = "";
      jsonData = JSON.parse(jsonData);
      var Campaign;
      var Feature;
      var Service;
      this.imageLink = jsonData.ProviderData.Details.ProviderInformation.BannerImageUrl;
      this.companyName = jsonData.ProviderData.Details.ProviderInformation.BusinessName;
      for (Campaign in jsonData.ProviderData.InsiderOffer.FavoriteOfferVM) {
        var campaign = jsonData.ProviderData.InsiderOffer.FavoriteOfferVM[Campaign];
        var newCampaign = {name: campaign.CampaignName, id: campaign.EndDate, title: campaign.CampaignName, services: []};
        for (Feature in campaign.FeatureDetails) {
          var feature = campaign.FeatureDetails[Feature];
          for (Service in feature.CustomServices) {
            var service = feature.CustomServices[Service];
            if (service.isOffered && service.ProviderCustomFeatureDetailId == this.id) {
              console.log("Found item");
              this.name = service.CustomText;
              this.originalPrice= service.Amount;
              this.price = service.InsiderPrice;
              this.description = service.CustomDescription;
              this.quantity = service.InsiderQuantity;
            }
          }
        }
      }
      console.log("Data retrieved");
      console.log(this.description);
    },

    httpGetAsync: function(url, callback) {
        var xmlHttp = new XMLHttpRequest();
        xmlHttp.onreadystatechange = function() {
            if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
                callback(xmlHttp.responseText);
        }
        xmlHttp.open("GET", url, true); // true for asynchronous
        xmlHttp.send(null);
    },

    goBack: function() {
      this.$router.push('/?company=' + this.company);
    }

  },

  created: function() {
    this.getAllPosts();
  }
}
</script>
