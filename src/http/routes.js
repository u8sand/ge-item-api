import { Models, Serializers } from '../model'

/**
 * Transforms a param string (1,2,3,4) into a filtered array of positive
 * integers.
 * @param  {String} ids comma separated list of item ids
 * @return {Array.<Number>} item ids
 */
const parseIds = function (ids) {
  return (ids || '').split(',')
    .map(x => +x)
    .filter(x => x > 0)
}

export const bulkItemPriceLookup = {
  handler: (req, reply) => {
    let ids = parseIds(req.query.ids)
    Models.ItemPrice.find({ itemId: { $in: ids } })
      .select({ itemId: 1, name: 1, members: 1, latestPrice: 1, updatedAt: 1 })
      .exec()
      .then(items => reply(Serializers.itemPrices(items)))
  }
}

export const singleItemPriceLookup = {
  handler: (req, reply) => {
    Models.ItemPrice.findById(req.params.itemId)
      .then(Serializers.itemPrice)
      .then(item => reply(item))
  }
}

export const itemPriceDump = {
  handler: (req, reply) => {
    Models.ItemPrice.find()
      .select({ itemId: 1, name: 1, members: 1, latestPrice: 1, updatedAt: 1 })
      .exec()
      .then(items => reply(Serializers.itemPrices(items)))
  }
}
