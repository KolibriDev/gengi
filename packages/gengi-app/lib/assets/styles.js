
const colors = {
  font: '#5B767E',
  blue: {
    light: '#E2F4F9',
  },
  green: {
    base: '#39D6B3',
    light: '#C4F6EB',
    dark: '#50E3C2',
    darker: '#178C72',
  },
  gray: {
    base: '#B7BDBE',
    light: '#CCCCCC',
    dark: '#555555',
  },
  orange: '#F6A623',
  dark: '#56656B',
  light: '#EDEDEB',
  lighter: '#F9F9F9',
  yellow: '#FFD100',
  alert: {
    red: '#C25243',
    green: '#85C243',
  },
}

module.exports = {

  currencyListItem: {
    backgroundColor: '#fff',
    marginBottom: 20,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 10,
    paddingRight: 10,
  },
  currencyListTitle: {
    fontSize: 36,
    lineHeight: 36,
    fontWeight: '700',
    color: colors.font,
  },
  currencyListName: {
    fontSize: 14,
    lineHeight: 16,
    fontWeight: '300',
    color: colors.font,
  },
  currencyListRate: {
    fontSize: 36,
    lineHeight: 36,
    fontWeight: '700',
    position: 'absolute',
    top: 10,
    right: 10,
    color: colors.green.base,
  },
  header : {
    backgroundColor: colors.green.base,
    paddingTop: 30,
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 10,
    flexDirection: 'row',
  },
  headerLogo: {
    width: 80,
    color: '#ffffff',
    textAlign: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  content: {
    flex: 1,
    backgroundColor: colors.light,
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  listView: {
    paddingTop: 20,
    paddingLeft: 20,
    paddingRight: 20,
  },
}
