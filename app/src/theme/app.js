const textStyle = {
  backgroundColor: '#fefefe',
  color: '#333333',
  borderBottom: '1px solid #e5ecea',
}

export const app = {
  grid: {
    title: {
      ...textStyle,
      width: '100%',
      marginBottom: 30,
      borderBottom: 'none'
    }
  },
  header: {
    default: {
      ...textStyle,
      cursor: 'pointer',
      transition: 'all .5s ease',
      width: '100%'
    },
    hover: {
      color: '#0b81fc'
    }
  },
  section: {},
  wrapper: {
    paddingLeft: 30,
    paddingRight: 30,
    maxHeight: 0,
  }
}