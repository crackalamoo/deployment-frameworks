<template>
  <div>
    <h1>{{ companyName }}</h1>
    <img :src="imageLink">
    <div v-for="campaign in posts">
      <h2>{{ campaign.name }}</h2>
      <div v-for="service in campaign.services">
        <a><p v-on:click = "serviceClicked(service)">{{ service.name }}</p></a>
      </div>
    </div>
    <div v-if="loading"><h1>Loading...</h1></div>
    <br><br><br>
  </div>
</template>
<script>
import axios from 'axios';

var jsonData = "";

export default {
  props: ['company'],

  data () {
    return {
      posts: [],
      loading: true,
      imageLink: "",
      companyName: "",
      companySearch: ""
    }
  },

  methods: {
    getAllPosts: function() {
      this.httpGetAsync("http://taptobook-qa.azurewebsites.net/api/version/3_1/ProviderAsync/GetHashCodeDetails?hashCode=" + this.companySearch + "&resetShowChat=true&updateAnalytics=false", this.responseFunction);
    },
    serviceClicked: function(service) {
      console.log(service.name);
      this.$router.push('/information?id=' + service.id + "&company=" + this.companySearch);
    },

    responseFunction: function(jsonData) {
      console.log("Starting retrieving of data");
      jsonData = JSON.parse(jsonData);
      var Campaign;
      var Feature;
      var Service;
      this.imageLink = jsonData.ProviderData.Details.ProviderInformation.BannerImageUrl;
      this.companyName = jsonData.ProviderData.Details.ProviderInformation.BusinessName;
      console.log(this.imageLink);
      for (Campaign in jsonData.ProviderData.InsiderOffer.FavoriteOfferVM) {
        var campaign = jsonData.ProviderData.InsiderOffer.FavoriteOfferVM[Campaign];
        var newCampaign = {name: campaign.CampaignName, id: campaign.EndDate, title: campaign.CampaignName, services: []};
        for (Feature in campaign.FeatureDetails) {
          var feature = campaign.FeatureDetails[Feature];
          for (Service in feature.CustomServices) {
            var service = feature.CustomServices[Service];
            if (service.isOffered) {newCampaign.services.push({name: service.CustomText, id: service.ProviderCustomFeatureDetailId});}
          }
        }
        this.posts.push(newCampaign);
      }
      this.loading = false;
    },
    httpGetAsync: function(url, callback) {
        var xmlHttp = new XMLHttpRequest();
        console.log("Running main JSON Function");
        xmlHttp.onreadystatechange = function() {
            if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
                callback(xmlHttp.responseText);
        }
        xmlHttp.open("GET", url, true); // true for asynchronous
        xmlHttp.send(null);
    }
  },

  created: function() {
    console.log("Starting");
    if (this.company == null) {this.companySearch = "OA5E752";}
    else {this.companySearch = this.company;}
    console.log(this.companySearch);
    this.getAllPosts();
  }
}

</script>
