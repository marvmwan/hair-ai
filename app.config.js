const IS_DEV = process.env.APP_VARIANT === "development";

export default {
  expo: {
    name: IS_DEV ? "hair-ai (Dev)" : "hair-ai",
    slug: "hair-ai",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/images/icon.png",
    scheme: "hairai",
    userInterfaceStyle: "automatic",
    newArchEnabled: true,
    ios: {
      supportsTablet: true,
      usesAppleSignIn: true,
      bundleIdentifier: "com.boringbuildscompany.hairai",
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/images/icon.png",
        backgroundColor: "#fffff6",
      },
      edgeToEdgeEnabled: true,
      package: "com.boringbuildscompany.hairai",
    },
    web: {
      bundler: "metro",
      output: "static",
      favicon: "./assets/images/favicon.png",
    },
    plugins: [
      "expo-router",
      [
        "expo-splash-screen",
        {
          image: "./assets/images/icon.png",
          imageWidth: 200,
          resizeMode: "contain",
          backgroundColor: "#fffff6",
        },
      ],
      "expo-build-properties",
      [
        "expo-font",
        {
          fonts: [
            "./assets/fonts/SF-Pro-Rounded-Black.otf",
            "./assets/fonts/SF-Pro-Rounded-Bold.otf",
            "./assets/fonts/SF-Pro-Rounded-Heavy.otf",
            "./assets/fonts/SF-Pro-Rounded-Light.otf",
            "./assets/fonts/SF-Pro-Rounded-Medium.otf",
            "./assets/fonts/SF-Pro-Rounded-Regular.otf",
            "./assets/fonts/SF-Pro-Rounded-Semibold.otf",
            "./assets/fonts/SF-Pro-Rounded-Regular.otf",
          ],
        },
      ],
      [
        "@react-native-google-signin/google-signin",
        {
          "iosUrlScheme": "com.googleusercontent.apps.298504905971-pkhbl7urc8e1sh3ghtr05u14tgsojqqi"
        }
      ],
      "expo-apple-authentication",
    ],
    experiments: {
      typedRoutes: true,
    },
    extra: {
      router: {},
      eas: {
        projectId: "e7132ca7-a4c8-4532-b50d-22c51a11aa25",
      },
      isDevelopment: IS_DEV,
      API_URL: IS_DEV
      ? "http://192.168.1.70:8000/hairapp"
      : "https://useskiniq.com/hairapp",
    },

  },
};
