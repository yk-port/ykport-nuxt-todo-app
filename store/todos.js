// firebaseの初期化のファイルをimportする
import firebase from '@/plugins/firebase'
// vuexfireのfirestoreActionをimport
import { firestoreAction } from 'vuexfire'

// firebaseのDBからtodosを取得する
const db = firebase.firestore()
const todosRef = db.collection('todos')

export const state = () => ({
  todos: [],
})

export const actions = {
  init: firestoreAction(({ bindFirestoreRef }) => {
    bindFirestoreRef('todos', todosRef)
  }),
  add: firestoreAction((context, name) => {
    // 渡ってきたデータが空白であるかどうかを判定する
    if (name.trim()) {
      todosRef.add({
        name,
        done: false,
        // サーバーから時刻を取得する記述
        created: firebase.firestore.FieldValue.serverTimestamp(),
      })
    }
  }),
  remove: firestoreAction((context, id) => {
    todosRef.doc(id).delete()
  }),
  toggleL: firestoreAction((context, todo) => {
    todosRef.doc(todo.id).update({
      done: !todo.done,
    })
  }),
}
