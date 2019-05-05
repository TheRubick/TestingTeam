# Stress testing http://ec2-52-90-5-77.compute-1.amazonaws.com/app/

from locust import HttpLocust, task, TaskSet

index = 1000

class MyTaskSet(TaskSet):
    # some variables used for all users
    initi = 1
    user = 0
    book = 0

    def on_start(self):
        self.email = "test@yahoo.com"
        self.login()
        self.remove_book_from_shelf()
        self.unfollow()
        MyTaskSet.initi = 0
    
    def on_stop(self):
        MyTaskSet.initi = 1
        self.remove_book_from_shelf()
        self.unfollow()
        self.logout()
    
    #@seq_task(1)
    def login(self):
         d = {"email": self.email,
              "password": "password"}
         resp = self.client.post('login', json=d)  # sending request including the required data
         token = resp.json().get('token')  # get the token to have full auth
         self.auth = {'Authorization': 'Bearer ' + token}  # stores the token to be used for accessing the Authorization

    #@seq_task(2)
    def logout(self):
         self.client.delete('logout', headers=self.auth)
         
    @task(1)
    def profile(self):
         self.client.get("showProfile", headers=self.auth)
     
    @task(1)
    def search_by_username(self):
         d = {"username": "Test"}
         self.client.get("search_by_username", headers=self.auth, json=d)
         
    @task(1)
    def search_by_name(self):
         d = {"name": "Test"}
         self.client.get("search_by_name", headers=self.auth, json=d)
         
    @task(1)
    def search_by_name_or_username(self):
         d = {"name": "Test"}
         self.client.get("search_by_name_username", headers=self.auth, json=d)
         
    @task(1)
    def shelf_books(self):
         d = {"shelf_name": 0}
         self.client.get("shelf", headers=self.auth, json=d)
         
    @task(1)
    def show_shelf(self):
        d = {"bookId": 1}
        self.client.get("showShelf", headers=self.auth, json=d)
        
    @task(1)
    def remove_book_from_shelf(self):
        d = {"shelf_id": 0,
             "book_id": 1}
        with self.client.delete("shelf/remove_book", headers=self.auth, json=d,
                                catch_response=True) as response:
            if response.status_code == 400:
                if MyTaskSet.book == 1 and MyTaskSet.initi == 0:
                    response.failure("Error: " + str(response.status_code) + ", Flag: " + str(MyTaskSet.book)
                                     + ". " + response.json().get("status"))
                else:
                    response.success()
            else:
                if response.status_code == 200:
                    MyTaskSet.book = 0
                    response.success()
                else:
                    response.failure("Error: " + str(response.status_code) + ", Flag: " + str(MyTaskSet.book)
                                     + ". " + response.json().get("status"))
        
    @task(1)
    def add_book_to_shelf(self):
        d = {"shelf_id": 0,
             "book_id": 1}
        with self.client.post("shelf/add_book", headers=self.auth, json=d,
                              catch_response=True) as response:
            if response.status_code == 400:
                if MyTaskSet.book == 0:
                    response.failure("Error: " + str(response.status_code) + ", Flag: " + str(MyTaskSet.book)
                                     + ". " + response.json().get("status"))
                else:
                    response.success()
            else:
                if response.status_code == 201:
                    MyTaskSet.book = 1
                    response.success()
                else:
                    response.failure("Error: " + str(response.status_code) + ", Flag: " + str(MyTaskSet.book)
                                     + ". " + response.json().get("status"))
        
    @task(1)
    def book_reviews(self):
        d = {"bookId": 1}
        self.client.get("showReviewsForABook", headers=self.auth, json=d)
        
    @task(1)
    def book_specific_review(self):
        d = {"reviewId": 1}
        self.client.get("showReviewOfBook", headers=self.auth, json=d)
        
    @task(1)
    def book_specific_user_review(self):
        d = {"bookId": 2,   # Sherwood
             "userId": 3}   # Waleed
        self.client.get("showReviewForBookForUser", headers=self.auth, json=d)
        
    @task(1)
    def book_review_by_title(self):
        d = {"title": "Sherwood"}
        with self.client.get("reviwes/books", headers=self.auth, json=d, catch_response=True) as response:
            if response.status_code == 400:
                response.failure("Error: " + response.json().get("status"))
            else:
                response.success()
        
    @task(1)
    def user_reviews(self):
        d = {"userId": 1}
        self.client.get("user_reviews", headers=self.auth, json=d)
        
    @task(1)
    def make_review(self):
        d = {"bookId": 1,
             "shelf": 0}
        self.client.post("reviwes/create", headers=self.auth, json=d)
#                              ,catch_response=True) as response:
#            if response.status_code == 
        
    @task(1)
    def delete_review(self):
        d = {"reviewId": 1}
        self.client.delete("reviwes/delete", headers=self.auth, json=d)
        
    @task(1)
    def unfollow(self):
        d = {"user_id": 2}
        with self.client.delete("unfollow", headers=self.auth, json=d,
                                catch_response=True) as response:
            if response.status_code == 404:
                if MyTaskSet.user == 1 and MyTaskSet.initi == 0:
                    response.failure("Error: " + str(response.status_code) + ", Flag: " + str(MyTaskSet.user)
                                     + ". " + response.json().get("status"))
                else:
                    response.success()
            else:
                if response.status_code == 200:
                    MyTaskSet.user = 0
                    response.success()
                else:
                    response.failure("Error: " + str(response.status_code) + ", Flag: " + str(MyTaskSet.user)
                                     + ". " + response.json().get("status"))
                
        
    @task(1)
    def follow(self):
        d = {"user_id": 2}
        with self.client.post("follow", headers=self.auth, json=d,
                                catch_response=True) as response:
            if response.status_code == 400:
                if MyTaskSet.user == 0:
                    response.failure("Error: " + str(response.status_code) + ", Flag: " + str(MyTaskSet.user)
                                     + ". " + response.json().get("status"))
                else:
                    response.success()
            else:
                if response.status_code == 201:
                    MyTaskSet.user = 1
                    response.success()
                else:
                    response.failure("Error: " + str(response.status_code) + ", Flag: " + str(MyTaskSet.user)
                                     + ". " + response.json().get("status"))
        
    @task(1)
    def following_list(self):
        self.client.get("following", headers=self.auth)
        
    @task(1)
    def followers_list(self):
        self.client.get("followers", headers=self.auth)
    
         
class MyLocust(HttpLocust):
    task_set = MyTaskSet
    