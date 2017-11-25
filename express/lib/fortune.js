// 幸运饼干
var fortunes = [
  "Conquer your fears or they will conquer you",
  "Rivers need springs",
  "Do not fear what you dont't know",
  "You will have a pleasant surpise"
]

exports.getFortune = () => {
  var idx = Math.floor(Math.random() * fortunes.length)
  return fortunes[idx]
}