const crudController = ({
  Type
}) => ({
  list: async (req, res) => {
    const data = (await Type.findAll()).map(d => d.sanitize ? d.sanitize() : d)
    res.status(200).send(data && data.sanitize ? data.sanitize() : data)
  },
  create: async (req, res) => {
    const data = (await Type.create(req.body))
    res.status(200).send(data && data.sanitize ? data.sanitize() : data)
  },
  read: async (req, res) => {
    const data = (await Type.findOne({where: {id: req.params.id}}))
    res.status(200).send(data && data.sanitize ? data.sanitize() : data)
  },
  update: async (req, res) => {
    const data = (await Type.update(req.body, { where: { id: req.params.id } }))
    res.status(200).send(data && data.sanitize ? data.sanitize() : data)
  },
  delete: async (req, res) => {
    const data = (await Type.delete({ where: { id: req.params.id } }))
    res.status(200).send(data && data.sanitize ? data.sanitize() : data)
  }
  // TODO: Create, Read, Update, Delete
})

module.exports = crudController