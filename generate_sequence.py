import os
import math
import numpy as np
from PIL import Image, ImageDraw, ImageFilter

def generate_frames():
    output_dirs = ["sequence", "temp_app/public/sequence", "public/sequence"]
    for dir_path in output_dirs:
        os.makedirs(dir_path, exist_ok=True)

    width, height = 1280, 720
    center_x, center_y = width / 2, height / 2
    num_frames = 90

    # Generate 3D nodes for an icosahedron / complex mesh
    phi = (1 + 5 ** 0.5) / 2
    raw_nodes = np.array([
        [-1,  phi, 0], [ 1,  phi, 0], [-1, -phi, 0], [ 1, -phi, 0],
        [0, -1,  phi], [0,  1,  phi], [0, -1, -phi], [0,  1, -phi],
        [ phi, 0, -1], [ phi, 0,  1], [-phi, 0, -1], [-phi, 0,  1]
    ], dtype=np.float32)
    # normalize nodes
    raw_nodes /= np.linalg.norm(raw_nodes, axis=1, keepdims=True)

    # 3D rings definition
    ring_radii = [180, 240, 300, 360]
    
    # 3D particles
    np.random.seed(42)
    num_particles = 250
    particles = np.random.uniform(-400, 400, (num_particles, 3))

    bg_color = (18, 18, 18) # #121212 hex

    print(f"Generating {num_frames} frames...")
    for frame_idx in range(num_frames):
        t = frame_idx / (num_frames - 1)  # 0.0 to 1.0
        
        # Create base canvas with #121212
        img = Image.new("RGB", (width, height), bg_color)
        draw = ImageDraw.Draw(img)

        # Camera & Rotation angle parameters evolving over scroll progress t
        rot_x = math.sin(t * math.pi * 2) * 0.5 + t * 0.8
        rot_y = t * math.pi * 3
        rot_z = math.cos(t * math.pi * 1.5) * 0.4
        
        # Camera zoom distance changing from 700 to 450 back to 600
        fov = 700 - math.sin(t * math.pi) * 200

        # Rotation matrix calculation
        cx, sx = math.cos(rot_x), math.sin(rot_x)
        cy, sy = math.cos(rot_y), math.sin(rot_y)
        cz, sz = math.cos(rot_z), math.sin(rot_z)

        # Combined Rotation Matrix
        R_x = np.array([[1, 0, 0], [0, cx, -sx], [0, sx, cx]])
        R_y = np.array([[cy, 0, sy], [0, 1, 0], [-sy, 0, cy]])
        R_z = np.array([[cz, -sz, 0], [sz, cz, 0], [0, 0, 1]])
        R = R_z @ R_y @ R_x

        # 1. Ambient central glow bloom
        glow_size = int(350 + math.sin(t * math.pi * 4) * 40)
        glow_img = Image.new("RGBA", (glow_size, glow_size), (0, 0, 0, 0))
        glow_draw = ImageDraw.Draw(glow_img)
        
        # Cyan-purple gradient bloom
        for r in range(glow_size // 2, 0, -4):
            alpha = int(45 * (1 - r / (glow_size / 2))**2)
            color = (
                int(50 + 150 * t),
                int(120 + 80 * (1-t)),
                int(230 - 50 * t),
                alpha
            )
            glow_draw.ellipse([glow_size//2 - r, glow_size//2 - r, glow_size//2 + r, glow_size//2 + r], fill=color)
        
        img.paste(glow_img, (int(center_x - glow_size//2), int(center_y - glow_size//2)), glow_img)

        # 2. Draw background tech grid lines
        grid_y = center_y + 120
        grid_color = (35, 40, 55)
        for i in range(-10, 11):
            x1 = center_x + i * 40 * (1 + t * 0.5)
            draw.line([(center_x + i * 150, height), (x1, grid_y)], fill=grid_color, width=1)
        for j in range(6):
            py = grid_y + (height - grid_y) * (j / 5)**1.8
            draw.line([(0, py), (width, py)], fill=grid_color, width=1)

        # 3. Project & draw 3D floating particles
        rotated_particles = particles @ R.T
        for pt in rotated_particles:
            pz = pt[2] + fov
            if pz > 10:
                scale = fov / pz
                px = center_x + pt[0] * scale
                py = center_y + pt[1] * scale
                if 0 <= px < width and 0 <= py < height:
                    p_size = max(1, int(2.5 * scale))
                    p_alpha = min(255, int(180 * (scale ** 1.5)))
                    p_color = (
                        int(100 + 155 * math.sin(px * 0.01 + t * 5)),
                        int(180 + 75 * math.cos(py * 0.01)),
                        255
                    )
                    draw.ellipse([px - p_size, py - p_size, px + p_size, py + p_size], fill=p_color)

        # 4. Project & draw 3D Orbital Rings
        for idx, radius in enumerate(ring_radii):
            ring_pts = []
            num_segments = 60
            tilt = (idx + 1) * 0.4 + t * (idx + 1) * 0.5
            for i in range(num_segments + 1):
                theta = i * 2 * math.pi / num_segments
                # Ring plane in 3D
                rx = radius * math.cos(theta)
                ry = radius * math.sin(theta) * math.cos(tilt)
                rz = radius * math.sin(theta) * math.sin(tilt)
                pt_3d = np.array([rx, ry, rz]) @ R.T
                pz = pt_3d[2] + fov
                if pz > 10:
                    scale = fov / pz
                    px = center_x + pt_3d[0] * scale
                    py = center_y + pt_3d[1] * scale
                    ring_pts.append((px, py, pz))

            for i in range(len(ring_pts) - 1):
                p1, p2 = ring_pts[i], ring_pts[i+1]
                avg_z = (p1[2] + p2[2]) / 2
                brightness = max(0.2, min(1.0, fov / avg_z))
                col_r = int(60 * brightness + 180 * t)
                col_g = int(180 * brightness * (1 - t*0.5))
                col_b = int(240 * brightness)
                w = max(1, int(2 * brightness))
                draw.line([(p1[0], p1[1]), (p2[0], p2[1])], fill=(col_r, col_g, col_b), width=w)

        # 5. Core 3D Mesh / Icosahedron nodes and wireframe
        mesh_scale = 160 + math.sin(t * math.pi * 2) * 30
        nodes_3d = (raw_nodes * mesh_scale) @ R.T
        projected_nodes = []
        for n in nodes_3d:
            pz = n[2] + fov
            scale = fov / pz
            px = center_x + n[0] * scale
            py = center_y + n[1] * scale
            projected_nodes.append((px, py, pz))

        # Connect nodes with glowing lines
        for i in range(len(projected_nodes)):
            for j in range(i + 1, len(projected_nodes)):
                dist = np.linalg.norm(raw_nodes[i] - raw_nodes[j])
                if dist < 1.1: # Adjacent vertices in icosahedron
                    p1, p2 = projected_nodes[i], projected_nodes[j]
                    avg_z = (p1[2] + p2[2]) / 2
                    line_alpha = max(0.2, min(1.0, fov / avg_z))
                    col = (
                        int(0 + 255 * line_alpha),
                        int(210 * line_alpha),
                        int(255 * line_alpha)
                    )
                    draw.line([(p1[0], p1[1]), (p2[0], p2[1])], fill=col, width=max(1, int(2.5 * line_alpha)))

        # Node glowing points
        for p in projected_nodes:
            px, py, pz = p
            scale = fov / pz
            r = max(2, int(6 * scale))
            draw.ellipse([px - r, py - r, px + r, py + r], fill=(255, 255, 255))
            draw.ellipse([px - r*1.8, py - r*1.8, px + r*1.8, py + r*1.8], outline=(0, 240, 255), width=1)

        # Save frame in webp format
        frame_filename = f"frame_{frame_idx:02d}_delay-0.067s.webp"
        for d in output_dirs:
            save_path = os.path.join(d, frame_filename)
            img.save(save_path, "WEBP", quality=90)

    print(f"Successfully generated 90 frames in sequence folders!")

if __name__ == "__main__":
    generate_frames()
