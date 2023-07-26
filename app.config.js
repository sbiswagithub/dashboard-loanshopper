export default {
    "expo": {
      name: "loanshopper",
      slug: "loanshopper",
      version: "1.2.4",
      orientation: "portrait",
      icon: "./assets/icon.png",
      splash: {
        image: "./assets/Loanshopper_Splash.png",
        resizeMode: "cover",
        backgroundColor: "#ffffff"
      },
      updates: {
        fallbackToCacheTimeout: 0
      },
      assetBundlePatterns: [ "**/*" ],
      "plugins": [
            [
              "expo-document-picker",
              {
                "iCloudContainerEnvironment": "Production"
              }
            ],
            [
              "expo-updates",
              {
                "username": "loanshopper"
              }
            ] 
          ],      
      ios: {
        supportsTablet: true,
        bundleIdentifier: "au.com.loanshopper",
        buildNumber: "1.2.4",
      },
      android: {
        package: "au.com.loanshopper",
        versionCode: 1,
        adaptiveIcon: {
          foregroundImage: "./assets/icon.png",
          backgroundColor: "#FFFFFf"
        }
      },
      web: {
        favicon: "./assets/icon.png"
      },
      scheme: "ls",
      description: "LoanShopper mortgage solutions",
      extra : {
        eas : {
          projectId : "8ab1604b-84b7-48c6-9520-bc08dff8ed23"
        }
    }
  }
}