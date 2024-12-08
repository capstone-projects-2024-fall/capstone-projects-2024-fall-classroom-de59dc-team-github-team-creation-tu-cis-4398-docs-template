import pygame
from BaseMode import BaseMode

class LogOne(BaseMode):

    _render = None

    def render(self):
        self._render

    def enter_screen(self):
        if self._render is None:
            # Load image once rather than render continuously
            self._render = pygame.image.load('../Backgrounds/Medici Venue.png')


