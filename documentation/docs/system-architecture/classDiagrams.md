---
sidebar_position: 2
---


# Class Diagrams

## Front End Class Diagram
```mermaid 
 
classDiagram 

  class App{
   +width: int 1000
   +height:int 700
   +music_loop() void
  }

  class LoginPage{
    +username:string
    -password:string
    +login_page()
  }
  class SignupPage{
    -Name: string
    +Username: string
    -Password: string
    +sign_up() void
  }

  class CustomizeCharacterPage{
    -totalSlots
    -currentLevel
    -availableslots
    -unavailableslots
    +addGold(int)
    +removeGold(int)
    +removeItem()
    +addItem()

    
  }
  class TutorialPage{
    + text: string
  }

  class MainMenuPage{
    + screen: int
    +character_page()
    +store_page()
    +help()
    +tutorial() void
    +settings() void
    +start_map_page()
    +assignment_page()
    +stopStartMusic()void

  }
  
  class AssignmentsPage{
    +Goal:string
    +itemReward: Item
    +ExpReward:int
    +Goldreward:int
    +Assignments() void
    +Quizzes() void
    +Lab()
    +Discussian()
  }

  class ProgressPage{
    +AssignmentInProgress: string
    +Gold:int
    +EXP:int

  }
  class AssignmentListPage{
    +RenderAllAssignment()void
  }


  class MapPage{
    -camera
    -player
    -controls
    +NPC(assignment)
    +movement() void
    +interaction_button()
    +generate_map()
    +LoadAssignments()
    +currentGame()
    +AssignmentInProgress()void
    +ListWeekAssignment()void

  }
  
  class MapBanner{
    +helpPage:string
    +changeMap()void

  }




  class CharacterPage{
    -currentLevel
    -currentEXP
    -currentGOLD
    -currentItems

  } 
  class StorePage{
    -armor:int 
    -classofWeapon:string
    -Goldcost:int
    -LevelReq:int
  }

  class MainMenuSettingsPage{
    +Logout
    +reconnectCanvas


  }
  class MainMenuHelpPage{
    + text:string

  }

 class AssignmentSettingsPage{
    +addAssignment
    +deleteAssignment
    +modifyAssignment
    +reloadAssignments
 }

class Equipment{
    +rarirty:int
    +cost:int
    +classreq:string
    +damage:int
    
    
}

class Weapon{
    +rarirty:int
    +cost:int
    +classreq:string
    +damage:int
    
}

  App*--LoginPage :Contains
  App*--SignupPage :Contains
  StorePage "1"<-- "1..*" Equipment
  StorePage "1"<-- "1..*"Weapon

  LoginPage  o--MainMenuPage
  MainMenuPage o--CustomizeCharacterPage
  SignupPage  *--TutorialPage :Contains
  SignupPage o--MainMenuPage



  MainMenuPage o--AssignmentsPage 
  MapPage o--AssignmentsPage 
  MainMenuPage o--MapPage
  MainMenuPage o--CharacterPage
  CustomizeCharacterPage o--StorePage
  MainMenuPage o--MainMenuSettingsPage
  MainMenuPage o--MainMenuHelpPage 
  

  AssignmentsPage<--ProgressPage
  AssignmentsPage<--AssignmentListPage

  AssignmentsPage *--AssignmentSettingsPage :Contains
  
  MapPage o--MapBanner




  