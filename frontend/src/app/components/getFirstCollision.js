function getFirstCollision(collisions, property) {
    if (!collisions || collisions.length === 0) {
      return null;
    }
  
    const [firstCollision] = collisions;
  
    return property ? firstCollision[property] : firstCollision;
}
export default getFirstCollision