var app = angular.module("app", []);
app.controller('appCtrl', function($scope, $location) {
  function formatTime(oldTime) {
    let newTime = oldTime;
    if (newTime[0] == "00" && newTime[1] == "00") {
      newTime = "Midnight";
    } else if (newTime[0] == "12" && newTime[1] == "00") {
      newTime = "Noon";
    } else if (Number(newTime[0]) > 12) {
      newTime = (Number(newTime[0]) - 12) + ":" + newTime[1] + " PM";
    } else if (newTime[0] == "00") {
      newTime = "12:" + newTime[1] + " AM";
    } else if (newTime[0] == "12") {
      newTime = "12:" + newTime[1] + " PM";
    } else {
      newTime = newTime[0] + ":" + newTime[1] + " AM";
    }
    return newTime
  }
  function formatMonth(month) {
    let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    return months[Number(month) - 1];
  }
  function formatDate(dateString) {
    let dateTime = dateString.split("T");
    let date = dateTime[0].split("-");
    let time = dateTime[1].split(":");
    return formatTime(time) + ", " + formatMonth(date[1]) + " " + Number(date[2])
  }
  function formatPrice(number) {
    if (number > 0) {
      return "$" + number.toFixed(2);
    } else {
      return "FREE";
    }
  }
  $scope.companyName = "Dev Retail";
  $scope.addressStreet = "4700 S Flamingo Rd";
  $scope.addressPlace = "Plantation, FL 33223";
  $scope.privacyPolicy1 = "I agree to receive text and email communications from Dev Retail, which include notifications and offers, and have reviewed the";
  $scope.privacyPolicy2 = "for complete terms and conditions. I reserve the right to opt out at any time.";
  $scope.campaigns = [{name: "New Customer Offer", end: "We know you'll love us!",
    offers: [{service: "Boot", description: "Purchase online and redeem in-store.",
    oldPrice: 20.00, newPrice: 10.00}]}];
  $scope.imageLink = "cart.png";
  // Dev Retail: s1192
  // Bamangwato Socks: A92EE0
  // Definitely Not Poisoned Food: CBF798
  // Washington's Training Camp: C5542D
  // Union Army: OA95871
  // Take Back America: OA5E752
  var companyCode = "OA95871";
  let url = "https://taptobook-qa.azurewebsites.net/api/version/3_1/ProviderAsync/GetHashCodeDetails?hashCode=" + companyCode + "&resetShowChat=true&updateAnalytics=false";
  var jsonData = $.ajax({
    url: url,
    async: false,
  }).responseJSON;
  $scope.imageLink = jsonData.ProviderData.Details.ProviderInformation.BannerImageUrl;
  $scope.companyName = jsonData.ProviderData.Details.ProviderInformation.BusinessName;
  let campaigns = [];
  let Campaign = 0;
  let Feature = 0;
  let Service = 0;
  let campaign = "";
  let newCampaign = "";
  let feature = "";
  let service = "";
  $scope.addressStreet = jsonData.ProviderData.Details.ProviderInformation.Address;
  $scope.addressPlace = jsonData.ProviderData.Details.ProviderInformation.City + ", " + jsonData.ProviderData.Details.ProviderInformation.State + " " + jsonData.ProviderData.Details.ProviderInformation.ZipCode;
  $scope.fullAddress = jsonData.ProviderData.Details.ProviderInformation.fullAddress;
  let mainDirectory = jsonData.ProviderData.InsiderOffer.FavoriteOfferVM;
  if (mainDirectory == null) {
    mainDirectory = jsonData.ProviderData.Details.Services
  }
  for (Campaign in mainDirectory) {
    campaign = mainDirectory[Campaign];
    newCampaign = {name: campaign.CampaignName, end: formatDate(campaign.EndDate), offers: []};
    for (Feature in campaign.FeatureDetails) {
      feature = campaign.FeatureDetails[Feature];
      for (Service in feature.CustomServices) {
        service = feature.CustomServices[Service];
        if (service.isOffered) {
          let description = service.CustomDescription;
          if (description == null) {
            description = "Purchase online or redeem in-store.";
          }
          newCampaign.offers.push({service: service.CustomText, id: service.ProviderCustomFeatureDetailId, description: description,
            oldPrice: formatPrice(service.Amount), newPrice: formatPrice(service.InsiderPrice), limited: service.IsLimitedQuantity});
        }
      }
    }
    campaigns.push(newCampaign);
  }
  $scope.campaigns = campaigns;
  console.log(jsonData);
  // $(".loading").hide();
  document.title = "Guest Checkout – " + $scope.companyName + " – Services";
});
console.log("Time to load:", (Date.now() - loadTimerStart)/1000.0, "seconds");
