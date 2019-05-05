from locust import HttpLocust, TaskSequence, task, seq_task

class MyTaskSequence(TaskSequence):

    @seq_task(1)
    def login(self):
        loginData = {"email": "ta7a@yahoo.com",
                     "password": "password"}

        loginResp = self.client.post('login', data=loginData)  # sending request including the required data
        token = loginResp.json().get('token')  # get the token to have full auth
        MyTaskSequence.auth = {'Authorization': 'Bearer ' + token}  # stores the token to be used for accessing the Authorization

    @seq_task(2)
    def updatesFunc(self):
        self.client.get('updates', headers=MyTaskSequence.auth)  # sending request including the required data

    @seq_task(3)
    def notifFunc(self):
        self.client.get('notification', headers=MyTaskSequence.auth)

    @seq_task(4)
    def mark_notifFunc(self):
        self.client.post('mark_notification', json={"id": 5}, headers=MyTaskSequence.auth)

    @seq_task(5)
    def listCommentsFunc(self):
        self.client.get('listComments', json={"id": 2}, headers=MyTaskSequence.auth)

    @seq_task(6)
    def makeCommentFunc(self):
        self.client.post('makeComment', json={"id": 2, "body": "hey world"}, headers=MyTaskSequence.auth)

    @seq_task(7)
    def deleteCommentFunc(self):
        self.client.delete('deleteComment', json={"id": 2}, headers=MyTaskSequence.auth)

    @seq_task(8)
    def listLikesFunc(self):
        self.client.get('listLikes', json={"id": 2}, headers=MyTaskSequence.auth)

    @seq_task(9)
    def likeorUnlikeFunc(self):
        self.client.post('LikeOrUnLike', json={"id": 2}, headers=MyTaskSequence.auth)
        self.interrupt()


class MyLocust(HttpLocust):
    task_set = MyTaskSequence
    min_wait = 1000
    max_wait = 2000