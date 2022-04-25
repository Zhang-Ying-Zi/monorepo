interface ILetterProcess {
  writeContext(context: string): void;
  fillEnvelope(address: string): void;
  letterIntoEnvelope(): void;
  sendLetter(): void;
}

class LetterProcessImpl implements ILetterProcess {
  writeContext(context: string): void {
    console.log(`** writeContext : ${context}**`);
  }
  fillEnvelope(address: string): void {
    console.log(`** fillEnvelope : ${address}**`);
  }
  letterIntoEnvelope(): void {
    console.log(`** letterIntoEnvelope **`);
  }
  sendLetter(): void {
    console.log(`** sendLetter **`);
  }
}

class Police {
  checkLetter(letterProcess: ILetterProcess) {
    console.log(`** ${letterProcess.toString()} checked **`);
  }
}

class ModernPostOffice {
  private letterProcess: ILetterProcess = new LetterProcessImpl();
  private police: Police = new Police();
  sendLetter(context: string, address: string) {
    this.letterProcess.writeContext(context);
    this.letterProcess.fillEnvelope(address);
    this.police.checkLetter(this.letterProcess);
    this.letterProcess.letterIntoEnvelope();
    this.letterProcess.sendLetter();
  }
}

const postOffice: ModernPostOffice = new ModernPostOffice();
postOffice.sendLetter("Hello Word", "road to haven");
