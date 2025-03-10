import { CommonModule } from '@angular/common';
import { Component, ElementRef, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { from, fromEvent, map, merge, mergeMap, tap } from 'rxjs';

@Component({
  selector: 'app-video',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './video.component.html',
  styleUrl: './video.component.scss'
})
export class VideoComponent {


  


  @ViewChildren('videoPlayer') videoPlayers!: QueryList<ElementRef>;



  playButton1: boolean = false


  videoId = 'udMULpKcnn8';
  sanitizedEmbedUrl!: SafeResourceUrl;

  constructor(private sanitizer: DomSanitizer) { }



  today: number = Date.now();
  ngOnInit(): void {
    this.sanitizedEmbedUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
      this.getEmbedUrl()
    );

  }

  getEmbedUrl(): string {
    return `https://www.youtube.com/embed/${this.videoId}?autoplay=1&mute=1&loop=1&playlist=${this.videoId}`;
  }





  ngAfterViewInit(): void {
    from(this.videoPlayers.toArray()).pipe(
      mergeMap((videoElement) => {
        const iframe: HTMLIFrameElement = videoElement.nativeElement;

        return from(new Promise<void>((resolve) => {
          if (iframe.contentWindow && iframe.contentDocument) {
            resolve();
          } else {
            iframe.onload = () => resolve();
          }
        }));
      }),
      tap(() => console.log('All iframes processed successfully'))
    ).subscribe();













  }





}








