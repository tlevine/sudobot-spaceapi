/* Tom ponders how to conveniently update the space API. Some ideas:
 *
 * Any door event, regardless of what it is, suggests that the space
 * is open.
 *
 * Or, only successful swipes suggest that the space is open.
 *
 * How do we determine when the space is closed?
 * I'm doing it based on time for now.
 *
 * To do:
 *   + Think more about how to determine openness.
 *   + Write tests.
 *   + Connect this to sudobot and to a space API endpoint.
 *
 */

INTERVAL = 3600 * 1000 // One hour
HACKERS_SLEEP = 1 // 1h00
HACKERS_MIGHT_WAKE_UP = 8 // 8h00

function isOpen (lastEventDate, presentDate) {
  if (presentDate - lastEventDate < INTERVAL)
    // Door was accessed recently.
    return true
  else if (presentDate.getHours() > HACKERS_MIGHT_WAKE_UP &&
           lastEventDate.getHours() > HACKERS_SLEEP &&
           lastEventDate.toDateString() == presentDate.toDateString())
    // Hackers have gone to sleep, and an early bird has woken up.
    return true
  else
    // It's the early morning, and nobody has swiped recently.
    return false   
}

module.exports = isOpen
