

class Clacks:
    custom_events = None # Dictionary of custom events
    alive = None
    clock = None # Needed for web server

    def __init__(self,):
        self.custom_events = {}
        self.alive = True