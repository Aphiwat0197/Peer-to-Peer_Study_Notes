# ADR 0001: External Video Calls for Tutoring

## Context
The platform allows students to book tutoring sessions with verified peer tutors using Credits. We need to decide how these tutoring sessions are actually conducted technologically.

## Options Considered
1. **Built-in WebRTC Video Call** (Integrating LiveKit or Daily.co directly into the platform).
2. **External Links** (Tutors manually provide a link to Google Meet, MS Teams, Zoom, or specify a physical campus location).

## Decision
We chose **Option 2 (External Links)** for the initial phases of the project. 

## Rationale
* **Development Speed:** Building a reliable, cross-device video call interface requires significant effort and testing. External tools are already perfected for this.
* **Cost:** Third-party video APIs charge per minute/user. Using external tools pushes this cost to the users' existing university accounts (e.g., University-provided Google Workspace/MS Teams).
* **Flexibility:** Allows students and tutors to negotiate physical meetups at the KMUTNB campus, which is common for peer-to-peer study sessions.

## Consequences
* The Booking table must include a field for `meeting_url` or `meeting_location` that the tutor can update once a booking is confirmed.
* We cannot automatically record sessions or track exact attendance duration through the system. Credits will be held in escrow and released either manually by the student confirming completion, or automatically after the scheduled time passes without dispute.
