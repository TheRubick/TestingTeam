from locust import HttpLocust, TaskSequence, task, seq_task, TaskSet

index = 0

class signUp_Delete(TaskSequence):

    auth = None
    @seq_task(1)
    def signUpFunc(self):
        signUpData = {
            "email": "test"+str(index)+"@yahoo.com",
            "password": "password",
            "password_confirmation": "password",
            "name": "dummy",
            "gender": "Male",
            "birthday": "27-11-1997",
            "country": "Egypt",
            "city": "Cairo"
        }
        signUpResp = self.client.post('signup', json=signUpData)  # sending request including the required data
        token = signUpResp.json().get("token")  # get the token to have full auth
        signUp_Delete.auth = {'Authorization': 'Bearer ' + token}  # stores the token to be used for accessing the Authorization
        global index
        index += 1

    # @seq_task(2)
    # def logOutFunc(self):
    #     self.client.delete('logout', headers=signUp_Delete.auth)  # sending request including the required data

    # @seq_task(3)
    # def login(self):
    #     loginData = {
    #         "email": "test@yahoo.com",
    #         "password": "password",
    #     }
    #     loginResp = self.client.post('login', data=loginData)  # sending request including the required data
    #     #token = loginResp.json().get('token')  # get the token to have full auth
    #     #MyTaskSequence.auth = {'Authorization': 'Bearer ' + token}  # stores the token to be used for accessing the Authorization
    #     self.interrupt()

    @seq_task(2)
    def deleteFunc(self):
        self.client.post('delete', json={'password': "password"}, headers=signUp_Delete.auth)
        self.interrupt()

class MyLocusts(HttpLocust):
    task_set = signUp_Delete
    min_wait = 1000
    max_wait = 2000

