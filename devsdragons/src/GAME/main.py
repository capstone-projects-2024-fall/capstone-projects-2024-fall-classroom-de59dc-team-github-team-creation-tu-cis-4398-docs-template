import pygame, asyncio
from pygame.time import Clock
import sys

import random

from devsdragons.src.GAME.temp import draw_background

# import button NEED TO FIX

pygame.init() # Might not need this line

# Game Window, when we incorporate the bottom panel
bottom_panel = 200 # Right now 0 before we add the editor keyboard (might not be here)
screen_width = 1536
screen_height = 600 + bottom_panel
screen = pygame.display.set_mode((screen_width, screen_height))
clock = pygame.time.Clock()
fps = 60

# Keep screen width and screen height as these represent a 20 to 9 aspect ratio which is smaller than
# 1024 by 768 (to accommodate all devices)

# Wallpaper dimensions are all 2400 by 1080, 20:9 aspect ratio
# For devices of 1024 by 768, use 960 by 432
# For devices of 1280 by 720, use 1200 by 540
# For devices of 1920 by 1080, use 1536 by 600 | which is currently being used




# Part 2: Load other Quest Stuff

pygame.display.set_caption("Battle")

# Define fonts
font = pygame.font.SysFont('Times New Roman', 40)

# Define colors
red = (255, 0, 0)
green = (0, 255, 0)
blue = (0, 0, 255)
black = (0, 0, 0)
gray = (240, 240, 240)
white = (255, 255, 255)

# Load Images
# Background image
try:
    background_image = pygame.image.load('Backgrounds/Moonlight Forest.png').convert_alpha()
    background_image = pygame.transform.scale(background_image, (screen_width, screen_height - bottom_panel))
except:
    background_image = None
    

# Scale the image to fit the screen

languages = ["Python", "JavaScript", "Java", "C", "C++"]
button_width, button_height = 200, 50
margin = 20

# editor settings
editor_x = screen_width // 2 - 300
editor_y = screen_height - bottom_panel + 20
editor_width, editor_height = 600, 160
editor_rect = pygame.Rect(editor_x, editor_y, editor_width, editor_height)
editor_font = pygame.font.Font(None, 20)


def IDE_button(text, x, y, color):
    # first creating a rectangle for the button
    # next drawing the button
    # next displaying the text on the center of the button
    button_rect = pygame.Rect(x, y, button_width, button_height)
    pygame.draw.rect(screen, color, button_rect)
    text_surface = font.render(text, True, white)
    text_rect = text_surface.get_rect(center=(x + button_width / 2, y + button_height/2))
    screen.blit(text_surface, text_rect)
    return button_rect

    
    
        
        

class HealthBar:
    def __init__(self, x, y, hp, max_hp):
        self.x = x
        self.y = y
        self.hp = hp
        self.max_hp = max_hp

    def draw(self, hp):
        # Update with new health
        self.hp = hp
        # Calculate new health ratio
        ratio = self.hp / self.max_hp
        pygame.draw.rect(screen, red, (self.x, self.y, 150, 20))
        pygame.draw.rect(screen, green, (self.x, self.y, 150 * ratio, 20))

class Fighter:
    def __init__(self, x, y, name, max_hp, strength, potions):
        self.name = name
        self.max_hp = max_hp
        self.hp = max_hp
        self.strength = strength
        self.start_potions = potions
        self.potions = potions
        self.alive = True
        self.animation_list = []
        self.frame_index = 0
        # 0 indicating idle, 1 attack, 2 hurt, 3 dead
        self.action = 0
        self.update_time = pygame.time.get_ticks()
        # Load idle animation images
        temp_list = []
        factor_to_scale_with = 5
        for i in range(4):
            sprite_image = pygame.image.load(f'img/{self.name}/Idle/{i}.png').convert_alpha()
            original_width = sprite_image.get_width()
            original_height = sprite_image.get_height()
            self.image = pygame.transform.scale(sprite_image, (original_width * factor_to_scale_with,
                                                        original_height * factor_to_scale_with))
            temp_list.append(self.image)
        self.animation_list.append(temp_list)

        self.image = self.animation_list[self.action][self.frame_index]
        self.rect = self.image.get_rect()
        self.rect.center = (x, y)

    def update(self):
        animation_cooldown = 100
        # Handle animation
        # Update image
        self.image = self.animation_list[self.action][self.frame_index]
        # Check if enough time has passed since the last update
        if pygame.time.get_ticks() - self.update_time > animation_cooldown:
            self.update_time = pygame.time.get_ticks()
            self.frame_index += 1
        # If the animation has run out then reset back to start
        if self.frame_index >= len(self.animation_list[self.action]):
            if self.action == 3:
                self.frame_index = len(self.animation_list[self.action]) - 1
            else:
                self.idle()

    def idle(self):
        # The idle animation as a function along with the variables
        self.action = 0
        self.frame_index = 0
        self.update_time = pygame.time.get_ticks()

    def draw(self):
        screen.blit(self.image, self.rect)

# Warning: Don't change the numbers
# But brief approximation, for every 1 increase in scale factor, decrease y by 10%

# How to change these numbers and position the character: FIGURED IT OUT!
dev = Fighter(520, (520 * 0.9), 'Dev', 30, 10, 3)
dragon = Fighter(1016, (520 * 0.9), 'Dragon', 20, 6, 1)

# Create health bars
dev_health_bar = HealthBar(448, 100, dev.hp, dev.max_hp)
dragon_health_bar = HealthBar(946, 100, dragon.hp, dragon.max_hp)


# Part 3: Game/Battle Logic (Loop)
#run = dev_health_bar != 0 or dragon_health_bar != 0


# editor variables
is_typing = False
code_lines = [""]
selected_language = None
buttons = []
language_chosen = False


async def main():
    global selected_language, is_typing, code_lines, language_chosen
    run = True
    while run:
        # Removed the get_background() function. If image exisits, then this is the new background. 
        if background_image:
            draw_background()
        else:
            screen.fill((30, 30, 30))  # 
            
        # Update and drawing the game components
        dev.update()
        dev.draw()
        dev_health_bar.draw(dev.hp)

        dragon.update()
        dragon.draw()
        dragon_health_bar.draw(dragon.hp)

        # First, provide the option of selecting the programming language
        if not selected_language:
            # Display language selection title and buttons
            # if language_chosen == False:
            if not language_chosen:
                title_text = font.render("Select a Programming Language", True, green)
            # position the text so that it is centerized and blitting it on the screen.
                screen.blit(title_text, (screen_width / 2 - title_text.get_width() / 2, 50))
            # providing choices for the programming language's, creating a button for each and displaying them. 
            for i, language in enumerate(languages):
                x = screen_width / 2 - button_width / 2
                y = 150 + i * (button_height + margin)
                color = black if selected_language != language else gray
                button = pygame.Rect(x, y, button_width, button_height)
                pygame.draw.rect(screen, color, button)
                text_surface = font.render(language, True, white)
                text_rect = text_surface.get_rect(center=(x + button_width / 2, y + button_height / 2))
                screen.blit(text_surface, text_rect)
                # storing the button's in a list
                buttons.append((button, language))
                #if button.clicked
            #selected_language = True
            #language_chosen = True
        else:
            # Display the selected language on the top left of the screen
            selected_text = font.render(f"Language: {selected_language}", True, red)
            screen.blit(selected_text, (50, 50))

            # Once the language has been chose, we can display the coding area
            title_text = font.render("Start coding here!", True, red)
            screen.blit(title_text, (screen_width / 2 - title_text.get_width() / 2, 100))
            pygame.draw.rect(screen, gray, editor_rect)
            pygame.draw.rect(screen, black, editor_rect, 2)

            # Draw code lines in the editor
            for i, line in enumerate(code_lines):
                line_surface = editor_font.render(line, True, black)
                screen.blit(line_surface, (editor_x + 5, editor_y + 5 + i * 20))

        # Changing things based on the event happening
        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                run = False
            elif event.type == pygame.MOUSEBUTTONDOWN:
                if not selected_language:
                    for button, language in buttons:
                        if button.collidepoint(event.pos):
                            selected_language = language
                            language_chosen = True
                            is_typing = True
                            print(f"Selected language: {selected_language}")
                else:
                    # if the user is in the editor box, setting is_typing = True
                    if editor_rect.collidepoint(event.pos):
                        is_typing = True
                    else:
                        is_typing = False
            
            # if the user presses a key and is_typing then:
            elif event.type == pygame.KEYDOWN and is_typing:
                # if the user enters the return key then a space is generated
                if event.key == pygame.K_RETURN:
                    code_lines.append("")
                    print(code_lines)
                    # if the user enter's backspace then we go the previous line, else we pop the last character
                elif event.key == pygame.K_BACKSPACE:
                    if len(code_lines[-1]) > 0:
                        code_lines[-1] = code_lines[-1][:-1]
                    elif len(code_lines) > 1:
                        code_lines.pop()
                    # if tab is hit generating enough space for the tab
                elif event.key == pygame.K_TAB:
                    code_lines[-1] += "    "
                else:
                    code_lines[-1] += event.unicode

        # Update display and maintain frame rate
        pygame.display.update()
        
        clock.tick(fps)

        #pygame.quit()
        await asyncio.sleep(0)
    
    pygame.quit()



asyncio.run(main())