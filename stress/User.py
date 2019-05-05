from locust import HttpLocust, TaskSequence, seq_task

class MyTaskSequence(TaskSequence):

    @seq_task(1)
    def login(self):
        loginData = {
                        "email": "test@yahoo.com",
                        "password": "password",
                    }
        loginResp = self.client.post('login', data=loginData)  # sending request including the required data
        token = loginResp.json().get('token')  # get the token to have full auth
        MyTaskSequence.auth = {'Authorization': 'Bearer ' + token}  # stores the token to be used for accessing the Authorization

    @seq_task(2)
    def changePassFunc(self):
        changePasswordData = {
            "password": "password",
            "newPassword": "password",
            "newPassword_confirmation": "password"
        }
        self.client.post('changepassword', json=changePasswordData, headers=MyTaskSequence.auth)

    @seq_task(3)
    def changeNameFunc(self):
        self.client.get('changename', json={'newName': "dummy"}, headers=MyTaskSequence.auth)

    @seq_task(4)
    def changeCountryFunc(self):
        self.client.get('changecountry', json={'newCountry': "Canada"}, headers=MyTaskSequence.auth)

    @seq_task(5)
    def changeCityFunc(self):
        self.client.get('changecity', json={"newCity": "Tornto"}, headers=MyTaskSequence.auth)

    @seq_task(6)
    def changeBirthDayFunc(self):
        self.client.get('changebirthday', json={"newBirthday": '24-12-2000'}, headers=MyTaskSequence.auth)

    @seq_task(7)
    def seeMyBirthDayFunc(self):
        self.client.get('whocanseemybirthday', json={"seeMyBirthday": "onlyMe"}, headers=MyTaskSequence.auth)

    @seq_task(8)
    def seeMyCountryFunc(self):
        self.client.get('whocanseemycountry', json={"seeMyCountry": "onlyMe"}, headers=MyTaskSequence.auth)

    @seq_task(9)
    def seeMyCityFunc(self):
        self.client.get('whocanseemycity', json={"seeMyCity": "onlyMe"}, headers=MyTaskSequence.auth)

    @seq_task(10)
    def showSettingFunc(self):
        showSettingsResp = self.client.get(url='showsetting', headers=MyTaskSequence.auth)
        MyTaskSequence.idNum = showSettingsResp.json().get('user').get('id')

    @seq_task(11)
    def showProfileFunc(self):
        self.client.get(url='showProfile', data={"id": MyTaskSequence.idNum}, headers=MyTaskSequence.auth)

    @seq_task(12)
    def verifyFunc(self):
        self.client.get('verify', headers=MyTaskSequence.auth)

    @seq_task(14)
    def resetPasswordFunc(self):
        resetPasswordData = {
            "password": "password",
            "password_confirmation": "password",
            "userId": MyTaskSequence.idNum,
        }
        self.client.post('resetpassword', json=resetPasswordData)

    @seq_task(15)
    def forgotPasswordFunc(self):
        self.client.post('forgotpassword', json={"email": "ta7a@yahoo.com"})
        self.interrupt()

class MyLocust(HttpLocust):
    task_set = MyTaskSequence
    min_wait = 1000
    max_wait = 2000