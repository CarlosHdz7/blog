class Utilities{

  formatDate(date, format) {
    const map = {
        dd: (date.getDate() < 10) ? date.getDate().toString().padStart(2,'0') : date.getDate(),
        mm: ((date.getMonth() + 1) < 10) ? (date.getMonth() + 1).toString().padStart(2,'0') : date.getMonth() + 1,
        yyyy: date.getFullYear()
    }

    return format.replace(/dd|mm|yyyy/gi, matched => map[matched])
  }
}

export default Utilities;