import keyMirror from 'keymirror';

export default keyMirror({

  /* promise for ajax requests */
  PROMISE:           null,
  /* ajax state */
  LOADING_STATE:     null,

  /* promise for deferred actions */
  START_TIMER:       null,
  STOP_TIMER:        null,
  /* timer events */
  TIMER_STARTED:     null,
  TIMER_STOPPED:     null,

  /* common actions */
  TOGGLE_USER_VIEW:  null,
  USER_LOADED:       null,
  USERS_LOADED:      null,
  PURCHASES_LOADED:  null,
  PURCHASE_ADDED:    null,
  CATEGORY_ADDED:    null,
  PRE_DEL_PURCHASE:  null,
  PURCHASE_DELETED:  null,
  UNDO_DEL_PURCHASE: null,
  FLASH_MESSAGE :    null,

  /* constants */
  VIEW_PURCHASES:    null,
  VIEW_CATEGORIES:   null

});
