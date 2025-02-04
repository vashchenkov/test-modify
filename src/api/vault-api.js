const vaultsList = [
    {
        "name": "Основной",
        "id": "ebae6596-910e-4077-a06e-4d1d37858e44"
    },
    {
        "name": "Второй",
        "id": "64328dbf-c7a2-4a60-9da9-70fa6449717f"
    },
    {
        "name": "№45",
        "id": "7f01bc1b-fe19-41c5-b7dd-b90c1ab101cd"
    }
]

export default  {

  async loadAllVaults(callback) {
      setTimeout(
          callback(vaultsList), 1000
      )
  },
  async createVault(vaultRequest, callback) {
      setTimeout(
          callback(), 400
      )
  },
  async updateVault(request, callback) {
      vaultsList.filter(item => item.id === request.id)[0].name = request.vaultName
      setTimeout(
          callback(true), 200
      )
  }
}
