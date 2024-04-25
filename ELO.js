var rating=[];
const elo = ([...ratings], kFactor = 100, selfRating) => {
  const [a, b] = ratings;
  const expectedScore = (self, opponent) => 1 / (1 + 10 ** ((opponent - self) / 400));
  const newRating = (rating, i) =>
    (selfRating || rating) + kFactor * (i - expectedScore(i ? a : b, i ? b : a));
  if (ratings.length === 2) {
    return [newRating(a, 1), newRating(b, 0)];
  } else {
    for (let i = 0; i < ratings.length; i++) {
      let j = i;
      while (j < ratings.length - 1) {
        [ratings[i], ratings[j + 1]] = elo([ratings[i], ratings[j + 1]], kFactor);
        j++;
      }
    }
  }
  return ratings;
};
function elo_calc(qwq){
    var mem_rating = [];
    for (let i = 0; i < qwq.length; i++) {
        mem_rating.push(rating[qwq[i]]);
    } mem_rating = elo(mem_rating);
    SetiH("s7","Match successful!");
    SetiH("s8","");
    for (let i = 0; i < qwq.length; i++) {
        var temp=rating[qwq[i]];
        insert("s8","Rating of "+Math.floor(qwq[i])+" : "+Math.floor(temp)+" ");
        rating[qwq[i]] = mem_rating[i];
        insert("s8","-> "+Math.floor(rating[qwq[i]])+" ("+(Math.floor(rating[qwq[i]]-temp))+")</br>");
    }
    Save();
}