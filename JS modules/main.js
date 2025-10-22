import { getComments } from './state.js';
import { renderComments } from './view.js';
import { initAddComment } from './addComment.js';
import { initLikeHandler } from './likeHandler.js';
import { initQuoteHandler } from './quoteHandler.js';

const nameInput = document.getElementById('name');
const textInput = document.getElementById('comment');
const button = document.getElementById('button');
const listRoot = document.querySelector('.comments');

renderComments(listRoot, getComments());
initAddComment({ nameInput, textInput, button, listRoot });
initLikeHandler({ listRoot });
initQuoteHandler({ listRoot, textInput });
