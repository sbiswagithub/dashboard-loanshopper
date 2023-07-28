import { StyleSheet } from "react-native";
import {  } from "react-native-paper";
import {
  LOGO_BRIGHT_BLUE,
  LOGO_DARK_BLUE,
  BACKGROUND_LIGHT_GRAY,
  WHITE,
  BACKGROUND_LIGHT_BLUE,
} from "../constants/colors";

const styles = StyleSheet.create({
  //  Color Pallete
  //  #c7edf3 - Background light blue
  //  #316ccc - Text Bright Blue
  //  #999999 - Text gray
  //  #e5e5e5 - background light gray
  //  #4C5270 - Dropdown option text
  //  #834187 - Purple
  //  #21b7d3 - Logo pale blue
  //  #00b4f1 - Logo bright blue
  //  #00b3f0 - Logo bright blue
  //  #511472 - Gradient purple
  //  #939393 - Gradient gray
  //  #1f215e - Logo dark blue
  //  #3C6088 - Overlay background ocean blue
  //  #fcc438 - Border yellow
  //  #e5e5e5 - Button background gray color
  colorLogoBrightBlue: { color: "#00b4f1" },
  header: {
    paddingTop: 30,
    width: "100%",
    height: 80,
    flexDirection: "row",
    backgroundColor: "#c7edf3",
  },
  logoHeader: { width: 150, height: 49 },
  logoMastheadWide: { width: 200, height: 65 },
  // ********************
  // Layout
  container: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#c7edf3",
  },
  background: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    height: "100%",
  },
  fadingContainer: {
    padding: 20,
    backgroundColor: 'powderblue',
  },
  fadingText: {
    fontSize: 28,
  },

  surface: {
    padding: 5,
    backgroundColor: "#c7edf3",
    borderRadius: 20,
    elevation: 4,
    height: 225,
    width: 250,
  },
  surfaceDocument: {
    padding: 5,
    backgroundColor: "#c7edf3",
    borderRadius: 20,
    elevation: 4,
    height: 85,
    width: 250,
    left: -50,
  },
  uploaderPanel: { flexDirection: "column", height: "65%", marginBottom: 75 },
  uploaderLargePanel: {
    flexDirection: "column",
    height: "75%",
    marginBottom: 75,
  },
  uploaderSmallPanel: {
    flexDirection: "column",
    height: "50%",
    marginBottom: 95,
  },
  fab: {
    position: "absolute",
    margin: 5,
    right: 0,
    bottom: 0,
    backgroundColor: "#00b4f1",
  },
  fabArrow: {
    left: -50,
    alignSelf: "center",
    backgroundColor: "#00b4f1",
  },
  viewStyle: {
    backgroundColor: "#F8F8F8",
    borderRadius: 10,
    paddingTop: 5,
    paddingBottom: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    marginBottom: 10,
    elevation: 2,
    position: "relative",
  },
  box: {
    flex: 0.9,
    flexDirection: "row",
    borderColor: "#834187",
    backgroundColor: "#ffffff",
    borderWidth: 2.0,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    margin: 5,
  },
  //--components--
  iconWrapper: {
    height: 60,
    width: 60,
    borderRadius: 50,
    borderColor: LOGO_BRIGHT_BLUE,
    borderWidth: 3,
    overflow: "hidden",
  },
  //--spacing--

  //padding
  p0: {
    padding: 0,
  },
  p1: {
    padding: 5,
  },
  p2: {
    padding: 10,
  },
  p3: {
    padding: 15,
  },
  p4: {
    padding: 20,
  },
  p5: {
    padding: 30,
  },

  //padding horizontal
  px0: {
    paddingHorizontal: 0,
  },
  px1: {
    paddingHorizontal: 5,
  },
  px2: {
    paddingHorizontal: 10,
  },
  px3: {
    paddingHorizontal: 15,
  },
  px4: {
    paddingHorizontal: 20,
  },
  px5: {
    paddingHorizontal: 30,
  },

  //padding vertical
  py0: {
    paddingVertical: 0,
  },
  py1: {
    paddingVertical: 5,
  },
  py2: {
    paddingVertical: 10,
  },
  py3: {
    paddingVertical: 15,
  },
  py4: {
    paddingVertical: 20,
  },
  py5: {
    paddingVertical: 30,
  },
  //padding right
  //padding left
  //padding top
  //padding bottom
  pb5: {
    paddingVertical: 30,
  },

  //margin
  m1: {
    margin: 5,
  },
  m2: {
    margin: 10,
  },
  m3: {
    margin: 15,
  },
  m4: {
    margin: 20,
  },
  m5: {
    margin: 30,
  },

  //---sizing---
  w100p: {
    width: "100%",
  },
  w90p: {
    width: "90%",
  },
  w80p: {
    width: "80%",
  },
  w60p: {
    width: "60%",
  },
  w50p: {
    width: "50%",
  },

  //---border---

  //border radius

  bR5: {
    borderRadius: 5,
  },
  bR50: {
    borderRadius: 50,
  },
  bR500: {
    borderRadius: 500,
  },

  //border width
  bw1: {
    borderWidth: 1,
  },

  bw2: {
    borderWidth: 2,
  },
  bw3: {
    borderWidth: 3,
  },
  bw5: {
    borderWidth: 5,
  },

  borderDark: {
    borderColor: "#111",
  },

  //colors
  bgWhite: {
    backgroundColor: "#fff",
  },
  bgLightGray: {
    backgroundColor: BACKGROUND_LIGHT_GRAY,
  },

  textLinkBold: {color: LOGO_BRIGHT_BLUE, fontWeight: 'bold',textDecorationLine: 'underline'},

  textBrightBlue: {
    color: LOGO_BRIGHT_BLUE,
  },

  bBrightBlue: {
    borderColor: LOGO_BRIGHT_BLUE,
  },
  borderBrightBlue: {
    borderColor: LOGO_BRIGHT_BLUE,
  },

  bgblue: {
    backgroundColor: "#1f215e",
  },
  bgBrightBlue: {
    backgroundColor: LOGO_BRIGHT_BLUE,
  },

  //--typography

  // Layouts
  flexRow: {
    flexDirection: "row",
  },
  flexStart: {
    justifyContent: "flex-start",
  },
  flexColumn: {
    flexDirection: "column",
  },
  centerItems: { alignItems: "center", justifyContent: "center" },
  alignCenter: { alignItems: "center" },
  justifyCenter: { justifyContent: "center" },
  //
  stackedSimpleLayout: { flexDirection: "column", alignContent: "center" },
  stackedLayout: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  stackedFromStartLayout: {
    flexDirection: "column",
    alignContent: "flex-start",
  },
  leftAlignedStackLayout: {
    flex: 1,
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "flex-start",
  },
  stretchedHorizontalLayout: {
    flex: 1,
    flexDirection: "row",
    alignItems: "stretch",
    justifyContent: "space-between",
  },
  stretchedVerticalLayout: {
    flex: 1,
    flexDirection: "column",
    alignItems: "stretch",
    justifyContent: "space-between",
  },
  stretchedWideVerticalLayout: {
    flexDirection: "column",
    width: "100%",
    justifyContent: "space-between",
    height:"100%"
  },
  evenlySpacedSingleRow: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  evenlySpacedSingleColumn: {
    flexDirection: "column",
    justifyContent: "space-evenly",
  },
  spaceFilledLayout: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  chipsLayout: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "stretch",
    margin:'1%'
  },
  chipsStackedLayout: {
    flexDirection: "column",
    justifyContent: "space-evenly",
    alignItems: "stretch",
    margin:'1%'
  },
  endToEndLayout: {flexDirection: "row", justifyContent: "space-between", alignItems:"center", width:'100%' },
  justifiedLayout: {
    flexDirection: "row",
    alignSelf: "stretch",
    alignContent: "space-between",
    margin: 3,
  },
  clumpedLeft: {
    flexDirection: "row",
    alignSelf: "flex-start",
    alignItems: "stretch",
  },
  clumpedRight: {
    flexDirection: "row",
    alignSelf: "flex-end",
    alignItems: "stretch",
  },
  flatEvenRow: { flex:1, flexDirection:"row", justifyContent: 'space-evenly', alignItems: 'stretch', margin:'2%'  },
  singleColumn: { flex: 1, flexDirection:'column'},
  boxRow: { flex: 1, flexDirection: "row" },
  boxCol60: { flex: 0.6, flexDirection: "column" },
  boxCol40: { flex: 0.4, flexDirection: "column" },
  padRight: { marginRight: 5 },

  rightAligned: { alignSelf: "flex-end" },
  leftAligned: { alignSelf: "flex-start" },
  centreAligned: { alignSelf: "center" },

  hr: {
    borderBottomColor: "black",
    borderBottomWidth: 0.4,
    marginBottom: 5,
    marginTop: 5,
  },
  hrLogoDarkBlue: {
    borderBottomColor: "#1f215e",
    borderBottomWidth: 3,
    marginBottom: 5,
    marginTop: 5,
  },
  hrLight: {
    borderBottomColor: "gray",
    borderBottomWidth: 0.4,
    marginBottom: 5,
    marginTop: 5,
  },
  hrWhite: {
    borderBottomColor: "white",
    borderBottomWidth: 1,
    marginBottom: 5,
    marginTop: 5,
  },
  space: { borderBottomWidth: 0, marginBottom: 5, marginTop: 5 },
  horizontalSpace: { marginLeft: 5, marginRight: 5 },
  tallSpace: { borderBottomWidth: 0, marginBottom: 7, marginTop: 7 },
  smallSpace: { borderBottomWidth: 0, marginBottom: 3, marginTop: 3 },
  // Fonts
  textBold: { fontWeight: "bold" },

  fwLow: {
    fontWeight: "300",
  },
  fwMid: {
    fontWeight: "500",
  },
  fwHigh: {
    fontWeight: "700",
  },
  fwBold: {
    fontWeight: "bold",
  },

  textLarge: { fontSize: 23 },
  textMediumLarge: {
    fontSize: 19,
  },

  textCenter: { textAlign: "center" },

  textDarkBlue: {
    color: "#1f215e",
  },
  textWhite: {
    color: "#fff",
  },
  textSmallBold: { fontSize: 12, fontWeight: "bold" },

  //
  textXSmall: { color: "#316ccc", fontSize: 9 },
  textXSmallBoldPurple: { color: "#834187", fontSize: 9, fontWeight: "bold" },
  textSmall: { color: "#316ccc", fontSize: 10 },
  textSmallGray: { color: "#999999", fontSize: 10 },
  textSmallWhite: { color: "#ffffff", fontSize: 10 },
  textSmallLogoPaleBlue: { color: "#21b7d3", fontSize: 10 },
  textSmallLogoDarkBlue: { color: "#1f215e", fontSize: 10 },
  textSmallBoldWhite: { color: "#ffffff", fontSize: 12, fontWeight: "bold" },
  textSmallBoldPurple: { color: "#834187", fontSize: 12, fontWeight: "bold" },
  textSmallBoldBlue: { color: "#0f4c75", fontSize: 12, fontWeight: "bold" },
  textSmallBoldGray: { color: "#999999", fontSize: 12, fontWeight: "bold" },
  textSmallBoldLogoPaleBlue: {
    color: "#21b7d3",
    fontSize: 12,
    fontWeight: "bold",
  },
  textSmallBoldLogoDarkBlue: {
    color: "#1f215e",
    fontSize: 12,
    fontWeight: "bold",
  },
  textMediumSmallLogoPaleBlue: { color: "#21b7d3", fontSize: 14 },
  textMediumSmallLogoDarkBlue: { color: "#1f215e", fontSize: 14 },
  textMediumSmallBlue: { color: "#316ccc", fontSize: 14 },
  textMediumSmallWhite: { color: "#ffffff", fontSize: 14 },
  textMediumWhite: { color: "#ffffff", fontSize: 16 },
  textMediumBold: { color: "#316ccc", fontSize: 16, fontWeight: "bold" },
  textMediumGray: { color: "#999999", fontSize: 16 },
  textMediumLogoDarkBlue: { color: "#1f215e", fontSize: 16 },
  textMediumLogoPaleBlue: { color: "#21b7d3", fontSize: 16 },
  textMediumBoldLogoPaleBlue: {
    color: "#21b7d3",
    fontSize: 16,
    fontWeight: "bold",
  },
  textMediumBoldLogoDarkBlue: {
    color: "#1f215e",
    fontSize: 16,
    fontWeight: "bold",
  },
  textMediumBoldPurple: { color: "#834187", fontSize: 16, fontWeight: "bold" },
  textMediumBoldGray: { color: "#999999", fontSize: 16, fontWeight: "bold" },
  textMediumBoldWhite: { color: "#ffffff", fontSize: 16, fontWeight: "bold" },
  textMediumBoldLogoBrightBlue: { color: LOGO_BRIGHT_BLUE, fontSize: 16, fontWeight: "bold" },
  textMediumGray: { color: "#999999", fontSize: 16 },
  textMedium: { color: "#316ccc", fontSize: 16 },
  textMediumPurple: { color: "#834187", fontSize: 16 },

  textLargeBlue: { color: "#316ccc", fontSize: 22 },
  textLargeLogoDarkBlue: { color: "#1f215e", fontSize: 22 },
  textLargeWhite: { color: "#ffffff", fontSize: 22 },
  textLargeBoldLogoDarkBlue: {
    color: "#1f215e",
    fontSize: 28,
    fontWeight: "bold",
  },
  textLargeBoldGray: { color: "#999999", fontSize: 28, fontWeight: "bold" },
  textLargeBoldPurple: { color: "#834187", fontSize: 28, fontWeight: "bold" },
  textLargeBoldWhite: { color: "#ffffff", fontSize: 28, fontWeight: "bold" },
  textXLargeBoldGray: { color: "#999999", fontSize: 36, fontWeight: "bold" },
  darkBlueColor: { color: "#0f4c75" },
  // Overlay foreground
  overlayOceanBlue: { backgroundColor: "#3C6088" },
  // Slider
  track: {
    alignSelf: "stretch",
    alignItems: "stretch",
    height: 10,
    backgroundColor: "transparent",
  },
  thumb: { height: 20, width: 20 },
  // Buttons
  dateCell: {
    alignItems: "center",
    padding: 1,
    margin: 2,
    width: "14%",
  },
  dateCellWithContent: {
    backgroundColor: "#7bd4f6",
    borderRadius: 20,
    alignItems: "center",
    padding: 1,
    margin: 2,
    width: "14%",
  },
  chipButton: {
    alignItems: "center",
    padding: 3,
    margin: 3,
  },
  chipButtonInFocus: {
    backgroundColor: "#00b4f1",
    borderWidth: 0,
    borderRadius: 20,
    alignItems: "center",
    padding: 3,
    margin: 3,
  },
  chipButtonView: {
    borderColor: "#1f215e",
    borderWidth: 2.0,
    borderRadius: 20,
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "stretch",
    alignItems: "center",
    padding: 3,
    margin: 3,
  },
  grayButton: {
    color: "#834187",
    borderColor: "#fcc438",
    backgroundColor: "#e5e5e5",
    borderWidth: 1,
    borderRadius: 5,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: 105,
    height: 50,
    padding: 3,
    margin: 5,
  },
  grayButtonWide: {
    color: "#834187",
    borderColor: "#fcc438",
    backgroundColor: "#e5e5e5",
    borderWidth: 1,
    borderRadius: 5,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: 160,
    height: 50,
    padding: 3,
    margin: 5,
  },
  grayButtonSmall: {
    color: "#834187",
    borderColor: "#fcc438",
    backgroundColor: "#e5e5e5",
    borderWidth: 1,
    borderRadius: 5,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: 105,
    height: 30,
    padding: 3,
    margin: 3,
  },
  largeGrayButton: {
    flex: 0.95,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: 210,
    margin: 10,
    borderColor: BACKGROUND_LIGHT_GRAY,
    backgroundColor: LOGO_DARK_BLUE,
    borderWidth: 6,
    borderRadius: 25,
  },
  largeGrayButtonText: {
    padding: 10,
    margin: 10,
    color: "#1f215e",
    fontSize: 16,
    fontWeight: "bold",
  },
  largeBlueButtonText: {
    color: WHITE,
    fontSize: 12,
    fontWeight: 'bold',
    alignSelf:"flex-end"
  },
  // Autocomplete Dropdown
  dropdownOption: {
    color: "#4C5270",
    borderColor: "gray",
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderRadius: 5,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    alignContent:"center",
    textAlign:"center",
    height: 50,
    padding: 1,
    margin: 1,
    flex: 1,
    flexWrap: "wrap",
    opacity: 0.7,
  },

  // Text Input
  textInput: {
    height: 40,
    color: "gray",
    borderColor: "#fcc438",
    borderWidth: 1,
    borderRadius: 10,
    padding: 5,
  },
  whiteBgCentredTextInput: {
    height: 40,
    textAlign: "center",
    color: "gray",
    borderColor: "#fcc438",
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderRadius: 10,
    padding: 5,
  },
  grayBgCentredTextInput: {
    height: 40,
    textAlign: "center",
    color: "gray",
    borderColor: "#fcc438",
    backgroundColor: "#dddddd",
    borderWidth: 1,
    borderRadius: 10,
    padding: 5,
  },
  bottomBorderCentredTextInput: {
    height: 40,
    textAlign: "center",
    color: "#1f215e",
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    borderBottomColor: "gray",
    borderColor: "#ffffff",
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderRadius: 10,
    padding: 5,
  },
  whiteBgCentredTextInputTaller: {
    height: 50,
    textAlign: "center",
    color: "gray",
    borderColor: "#fcc438",
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderRadius: 10,
    padding: 5,
  },

  // Cards
  cardTitle: { color: "#316ccc", fontSize: 11, fontWeight: "bold" },
  cardContent: {
    alignItems: "center",
    justifyContent: "space-evenly",
    paddingLeft: 5,
    paddingRight: 5,
  },
  // Tables
  tableView: { flexDirection: "column", flex: 0.9 },
  tableHeader: {
    flexDirection: "row",
    alignItems: "stretch",
    justifyContent: "space-between",
    marginTop: 3,
    marginBottom: 3,
  },
  tableColumn: { flexDirection: "column" },
  tableColumn20: { flexDirection: "column", maxWidth: 20 },
  tableColumn70: { flexDirection: "column", maxWidth: 70 },
  tableColumn100: { flexDirection: "column", maxWidth: 100 },
  tableColumn150: { flexDirection: "column", maxWidth: 150 },
  tableColumn50pct: {
    flexDirection: "column",
    width: "50%",
    maxWidth: "50%",
    marginLeft: 3,
  },
  tableColumn60pct: {
    flexDirection: "column",
    width: "60%",
    maxWidth: "60%",
    marginLeft: 3,
  },
  tableColumn70pct: {
    flexDirection: "column",
    width: "70%",
    maxWidth: "70%",
    marginLeft: 3,
  },
  tableColumn75pct: {
    flexDirection: "column",
    width: "75%",
    maxWidth: "75%",
    marginLeft: 3,
  },
  tableColumn80pct: {
    flexDirection: "column",
    width: "80%",
    maxWidth: "80%",
    marginLeft: 3,
  },
  tableColumn40pct: {
    flexDirection: "column",
    width: "40%",
    maxWidth: "40%",
    marginLeft: 3,
  },
  tableColumn30pct: {
    flexDirection: "column",
    width: "30%",
    maxWidth: "30%",
    marginLeft: 3,
  },
  tableColumn20pct: {
    flexDirection: "column",
    width: "20%",
    maxWidth: "20%",
    marginLeft: 3,
  },
  tableColumn100pct: {
    flexDirection: "column",
    width: "100%",
    maxWidth: "100%",
    marginLeft: 3,
  },
  tableDivider: {
    marginTop: 3,
    marginBottom: 8,
    borderWidth: 0.5,
    alignContent: "stretch",
    borderColor: "#8a9499",
  },
  tableRow: { flexDirection: "row", justifyContent: "space-between" },
  // Slider
  sliderRegular: { width: 200, height: 40 },
  // Panels and boxes
  panelStretchedRed: {
    borderColor: "#ff5722",
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    margin: 5,
  },

  // ********************
  // Login Screen
  loginBox: { flex: 1, flexDirection: "column", alignItems: "center" },
  loginRowTop: {  flexDirection: "row", alignItems: "flex-start" },
  signInBannerBlock: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    borderBottomColor: "black",
    borderBottomWidth: 0.4,
  },
  signInBanner: {
    flex: 1,
    flexDirection: "column",
    alignItems: "flex-start",
    padding: 5,
  },
  loginRow: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  loginRowLoginButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  loginRowBottom: {
    flex: 0.8,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },

  // Home Page
  homeBoxColumn: {
    flex: 1,
    flexDirection: "column",
    marginTop: 0,
    margin: 5,
  },
  homeBoxRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 3,
    marginBottom: 7,
  },
  homeBoxPanel: {
    flex: 1,
    flexDirection: "column",
    borderColor: "#d7d2dc",
    borderWidth: 0.4,
    borderRadius: 20,
    padding: 10,
    alignItems: "stretch",
    justifyContent: "space-evenly",
  },
  homeBoxPanelHeader: { flex: 0.9, flexDirection: "row" },
  homeBoxPanelHeaderIcon: { width: 20, height: 20, marginRight: 5 },
  qComparePanelRowContent: {
    flexDirection: "row",
    alignItems: "stretch",
    justifyContent: "space-between",
    margin: 3,
  },
  qCompareButtonRowContent: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "center",
    margin: 3,
  },
  entryPanel: { flex: 1, flexDirection: "column",  },
  entryButtonRowContent: {
    flexDirection: "row",
    alignItems: "stretch",
    justifyContent: "center",
  },
  // ********************
  // Bottom Tabs
  bottomTabBar: {
    flex: 0.05,
    flexDirection: "row",
    borderColor: "#fcc438",
    backgroundColor: "#ffffff",
    borderWidth: 2.0,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "space-evenly",
    padding: 10,
    marginTop: 0,
    marginBottom: 20,
    margin: 5,
  },
  menuButtons: { flex: 1, flexDirection: "row", padding: 10 },
  tabIcon: { width: 20, height: 20 },
  tabSelected: {
    flex: 1,
    flexDirection: "column",
    borderColor: "#fcc438",
    backgroundColor: "#ef8d22",
    borderWidth: 2.0,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    padding: 15,
  },
  tabUnSelected: {},
  chipError: {
    marginLeft: 3,
    marginRight: 3,
    borderColor: "#ffffff",
    backgroundColor: "#dd2c00",
  },
  chipNormal: {
    marginLeft: 3,
    marginRight: 3,
    borderColor: "#ffffff",
    backgroundColor: "#8d93ab",
    padding:"2%", 
  },
  chipNoticeable: {
    marginLeft: 3,
    marginRight: 3,
    borderColor: "#ffffff",
    backgroundColor: "#1f215e",
  },
  // Autocomplete PostBox selector
  postboxACOuter: { flex: 1, marginLeft: 10 },
  autoComplete: { borderWidth: 0 },
  autoCompleteList: {
    borderColor: "#d7d2dc",
    backgroundColor: "#ffffff",
    borderWidth: 2.0,
    borderRadius: 20,
  },
  overlayPanel: {
    flex: 0.4,
    flexDirection: "column",
    backgroundColor: "rgba(52, 52, 52, 0.0)",
    alignItems: "stretch",
    justifyContent: "center",
  },
  overlayPanelColumn: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  featuredDealPanelHeader: { flex: 0.9, flexDirection: "column" },
  // Featured Broker Card
  brokerCard: {
    borderColor: "#d7d2dc",
    backgroundColor: "#ffffff",
    borderWidth: 2.0,
    borderRadius: 20,
  },
  brokerCardPanel: {
    flexDirection: "column",
    alignItems: "stretch",
    justifyContent: "space-around",
  },
  homeLoanSlider: { flex: 1, alignItems: "stretch", justifyContent: "center" },

  // ********************
  // Disclosure Page
  disclosureBox: {
    flex: 1,
    flexDirection: "row",
    borderColor: "#fcc438",
    borderWidth: 2.0,
    borderRadius: 20,
    alignItems: "flex-start",
    margin: 5,
  },
  disclosureBoxBlue: {
    flex: 1,
    flexDirection: "row",
    borderColor: "#00bcd4",
    borderWidth: 2.0,
    borderRadius: 20,
    alignSelf: "flex-start",
    margin: 5,
  },
  disclosureMasthead: { flexDirection: "row" },
  disclosureContainer: { width: "100%" },
  disclosureMinRequirementsPanel: {
    borderColor: "#d1cebd",
    backgroundColor: "#EEEDE7",
    borderWidth: 6,
    borderRadius: 15,
    padding: 3,
    paddingBottom: 5,
  },
  disclosurePanel: {
    borderColor: "#999999",
    borderWidth: 1,
    borderRadius: 10,
    margin: 5,
    paddingTop: 10,
    paddingBottom: 10,
  },
  disclosurePanelBlue: {
    borderColor: "#21b7d3",
    borderWidth: 1,
    borderRadius: 10,
    marginTop: 10,
    paddingTop: 10,
    paddingBottom: 10,
  },
  disclosurePanelRed: {
    borderColor: "#ff5722",
    borderWidth: 1,
    borderRadius: 10,
    marginTop: 10,
    paddingTop: 10,
    paddingBottom: 10,
  },
  disclosureBoxColumn: {
    flex: 1,
    flexDirection: "column",
    width: "100%",
    marginTop: 0,
    margin: 5,
  },
  disclosureBoxRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 5,
  },
  disclosureBoxWideRow: { justifyContent: "space-around", marginTop: 5 },
  disclTextEntry100: { width: 100, marginBottom: 3 },
  disclTextEntry: { width: 150, marginBottom: 3 },
  disclTextEntryWide: { width: 250, padding: 10 },
  disclDivider: {
    marginTop: 10,
    borderWidth: 0.5,
    width: 300,
    alignSelf: "center",
    borderColor: "#8a9499",
  },
  borrowPanel: {
    borderColor: "#d1cebd",
    backgroundColor: "#ffffff",
    borderWidth: 6,
    borderRadius: 15,
    padding: '1%',
  },
  borrowPanelRowContent: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "center",
  },
  searchBoxBlue: {
    flex: 1,
    flexDirection: "row",
    borderColor: "#00bcd4",
    borderWidth: 2.0,
    borderRadius: 20,
    alignItems: "flex-start",
    padding: 5,
    margin: 5,
  },
  searchResultsBlue: {
    flex: 1,
    flexDirection: "column",
    borderColor: "#00bcd4",
    borderWidth: 0.7,
    borderRadius: 20,
    alignItems: "flex-start",
  },

  // Broker Search
  brokerSearchContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "flex-start",
  },
  brokerSearchBox: {
    flex: 1,
    flexDirection: "row",
  },
  brokerSearchRow: { flex: 1, flexDirection: "row", margin: 5 },
  brokerSearchPanel: {
    borderColor: "#fcc438",
    backgroundColor: "#ffffff",
    borderWidth: 0.4,
    borderRadius: 20,
    padding: 5,
  },
  brokerSearchPanelHeader: {
    flexDirection: "row",
    alignSelf: "flex-start",
    alignItems: "stretch",
    padding: 3,
  },
  brokerSearchPanelHeaderIcon: { width: 20, height: 20, marginRight: 5 },
  // User Registration
  userRegistrationBottom: {
    flexDirection: "column",
    alignItems: "stretch",
    justifyContent: "flex-start",
    marginLeft: 25,
    marginRight: 25,
  },
  // Borrowing Estimates Charts
  stackedBarChart: { marginVertical: 8, borderRadius: 10, fontFamily : 'Arial' },

  // Compare proposals
  compareScrollPanel: { borderRightWidth: 1, borderColor: "#ffffff" },
  compareSelected: {
    flexDirection: "column",
    borderWidth: 0.3,
    borderRadius: 20,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    padding: 5,
    margin: 5,
    backgroundColor: "#00b4f1",
  },
  compareXSelected: {
    flexDirection: "column",
    borderWidth: 0.3,
    borderRadius: 20,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    padding: 5,
    margin: 5,
    backgroundColor: "#ffffff",
  },
  // Email uploader
  uploaderTopButtons: {
    flexDirection: "row",
    alignItems: "stretch",
    justifyContent: "space-between",
  },
  // Files
  stagingFile: { height: 260, margin: 10, width: "175%" },
  fileNameCard: {
    borderRadius: 5,
    borderWidth: 0.5,
    borderColor: "grey",
    elevation: 4,
    margin: 5,
    width: 145,
    maxWidth: 145,
  },
  fileTypesCard: {
    borderRadius: 5,
    borderWidth: 0.5,
    borderColor: "grey",
    elevation: 4,
    margin: 5,
    height: 250,
  },
  // File details
  fileDetailsCard: {
    borderRadius: 5,
    borderWidth: 0.2,
    borderColor: "grey",
    elevation: 4,
    margin: 5,
    width: '95%',
    backgroundColor: BACKGROUND_LIGHT_BLUE
  },
  disappear: { height: 0, width: 0, borderWidth: 0, display:"none" },
  B: {
    borderRadius: 0,
    borderColor: "red",
    borderWidth: 1,
  },
});

export default function getStyleSheet() {
  return styles;
}
