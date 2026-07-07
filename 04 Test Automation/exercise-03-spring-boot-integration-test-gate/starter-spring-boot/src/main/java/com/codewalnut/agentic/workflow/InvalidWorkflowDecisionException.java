package com.codewalnut.agentic.workflow;

public class InvalidWorkflowDecisionException extends RuntimeException {
  public InvalidWorkflowDecisionException(String message) {
    super(message);
  }
}
