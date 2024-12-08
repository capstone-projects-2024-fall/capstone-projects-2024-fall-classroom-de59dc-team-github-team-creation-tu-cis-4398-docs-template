


class Contact:
    def __init__(self, _id, name, email, password):
        self._id = _id
        self.name = name
        self.email = email
        self.password = password
        self.guildsIn = []
        self.questMade = []
        
        
        
        def numberOfGuildsIn(self):
            return len(self.guildsIn)
        
        
        def questsMadeByUser(self):
            return len(self.questMade)
        
