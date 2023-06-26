import socket
import threading
import pygame

SCREEN_WIDTH = 800
SCREEN_HEIGHT = 600

screen = pygame.display.set_mode((SCREEN_WIDTH, SCREEN_HEIGHT))
inputs = [False, False, False, False]
pos = [0, 0]
other_positions = [[0, 0]]


def make_input_data(input_list):
    data = b""
    for i in range(4):
        if input_list[i]:
            data += b"1 "
        else:
            data += b"0 "
    
    return data


class Client:
    server_host = "127.0.0.1"
    server_port = 4000
    server_sock = None
    server_conn = None
    running = True

    def __init__(self) -> None:
        self.server_sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)

    def connect(self):
        self.server_sock.connect((self.server_host, self.server_port))

    def send_data(self):
        global pos
        while self.running:
            self.server_sock.sendall(make_input_data(inputs))
            data = str(self.server_sock.recv(1024))[2:-1]
            print("received data:", data)
            pos1 = [float(x) for x in data.split()]
            pos[0] = pos1[0]
            pos[1] = pos1[1]
            if len(pos1) > 2:
                other_positions[0] = [pos1[2], pos1[3]]




client = Client()
client.connect()
print("connected")

socket_thread = threading.Thread(target=client.send_data)
socket_thread.start()
running = True
while running:
    screen.fill((0, 0, 0))
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            running = False
    
    keys = pygame.key.get_pressed()
    if keys[pygame.K_w]:
        inputs[0] = True
    else:
        inputs[0] = False
    if keys[pygame.K_a]:
        inputs[1] = True
    else:
        inputs[1] = False
    if keys[pygame.K_s]:
        inputs[2] = True
    else:
        inputs[2] = False
    if keys[pygame.K_d]:
        inputs[3] = True
    else:
        inputs[3] = False
    
    pygame.draw.circle(screen, (255, 255, 255), pos, 20)

    for other_pos in other_positions:
        pygame.draw.circle(screen, (255, 255, 255), other_pos, 20)

    pygame.display.update()
